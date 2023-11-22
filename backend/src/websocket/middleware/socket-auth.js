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
    console.log(socket.handshake)
    try {
        const cookies = socket.handshake.headers.cookie
        console.log(cookies)
        if (!cookies) return next(new Error("NOT_AUTHENTICATED"))

        const cookieObj = formatCookies(cookies)

        //check if access token is there
        if (!Object.keys(cookieObj).includes(process.env.TOKEN_NAME)) return next(new Error("NOT_AUTHENTICATED"))
        //get the token out of the cookies object
        const TOKEN = cookies[process.env.TOKEN_NAME]
        //checks if token is valid
        const validToken = verify(TOKEN, process.env.TOKEN_SECRET)
        if (validToken) return next()
        return next(new Error("NOT_AUTHENTICATED"))
    } catch(err) {
        //returns error if token is invalid
        return next(new Error("NOT_AUTHENTICATED"))
    }
}