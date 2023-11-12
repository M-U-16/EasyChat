import jwt from "jsonwebtoken"
const { verify } = jwt

const formatCookie = (cookieString) => {
    const cookieObject = {}
    const cookieArray = cookieString
        .split(" ")
        .map(cookie => cookie.split("="))
    cookieArray.forEach(cookie => {
        cookieObject[cookie[0]] = cookie[1]
    });
    return cookieObject
}

export const auth = (socket, next) => {
    const cookies = formatCookie(socket.handshake.headers.cookie)
    if (!cookies) return next(new Error("NOT_AUTHENTICATED"))

    //check if access token is there
    if (!Object.keys(cookies).includes(process.env.TOKEN_NAME)) return next(new Error("NOT_AUTHENTICATED"))
    //get the token out of the cookies object
    const TOKEN = cookies[process.env.TOKEN_NAME]
    try {
        //checks if token is valid
        const validToken = verify(TOKEN, process.env.TOKEN_SECRET)
        if (validToken) return next()
        return next(new Error("NOT_AUTHENTICATED"))
    } catch(err) {
        //console.log(err)
        //returns error if token is invalid
        return next(new Error("NOT_AUTHENTICATED"))
    }
}