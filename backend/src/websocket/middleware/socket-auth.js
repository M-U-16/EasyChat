import jwt from "jsonwebtoken"
const { verify } = jwt

const formatCookies = (cookieString) => {
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
        console.log(err)
        return null
    }
}
export const auth = (socket, next) => {
    try {

        const cookies = socket.handshake.headers.cookie
        if (!cookies) return next(new Error("NOT_AUTHENTICATED"))
        const cookieObjs = formatCookies(cookies)

        //check if access token is there
        if (!Object.keys(cookieObjs).includes(process.env.TOKEN_NAME)) return next(new Error("NOT_AUTHENTICATED"))
        //get the token out of the cookies object
        const TOKEN = cookieObjs[process.env.TOKEN_NAME]
        //checks if token is valid
        const validToken = verify(TOKEN, process.env.TOKEN_SECRET)

        //return error if not valid
        if (!validToken) return next(new Error("NOT_AUTHENTICATED"))
        //forward reqeuest
        socket.data = validToken
        return next()
    } catch(err) {
        //returns error if token is invalid
        console.log(err)
        return next(new Error("NOT_AUTHENTICATED"))
    }
}