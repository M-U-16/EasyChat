import jwt from "jsonwebtoken"
const { verify } = jwt

export function formatCookies(cookieString) {
    try {
        const cookieObject = {}
        const cookieArray = cookieString
            .split(" ")
            .map(cookie => cookie.split("="))
            cookieArray.forEach(cookie => {
                cookieObject[cookie[0]] = cookie[1]
            });

        return cookieObject
    } catch(err) {
        return null
    }
}

export function auth(socket, next) {
    console.log("client connecting")
    //console.log(socket.handshake.headers)

    try {
        const cookies = socket.handshake.headers.cookie
        if (!cookies) return next(new Error("NOT_AUTHENTICATED"))
        const cookieObjs = formatCookies(cookies)

        //check if access token is there
        if (!Object.keys(cookieObjs).includes(process.env.TOKEN_NAME)) return next(new Error("NOT_AUTHENTICATED"))
        
        //get the token out of the cookies object
        const TOKEN = cookieObjs[process.env.TOKEN_NAME]
        const validToken = verify(TOKEN, process.env.TOKEN_SECRET)
        //return error if not valid
        if (!validToken) return next(new Error("NOT_AUTHENTICATED"))
        
        socket.data = {...validToken, ...socket.data}
        //forward request
        return next()

    } catch(err) {
        //error if token is invalid
        return next(new Error("NOT_AUTHENTICATED"))
    }
}