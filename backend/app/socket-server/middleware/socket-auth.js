import jwt from "jsonwebtoken"
const { verify } = jwt

export const auth = (socket, next) => {
    const COOKIE_REGEX = /=(.*)/
    const cookies = socket.handshake.headers.cookie
    if (!cookies) return next(new Error("NOT_AUTHENTICATED"))

    const TOKEN = cookies.match(COOKIE_REGEX)[1]
    
    if (!TOKEN) return next(new Error("NOT_AUTHENTICATED"))
    try {
        const validToken = verify(TOKEN, process.env.TOKEN_SECRET)
        if (validToken) return next()
        return next(new Error("NOT_AUTHENTICATED"))
    } catch(err) {
        console.log(err)
        return next(new Error("NOT_AUTHENTICATED"))
    }
}