import jwt from "jsonwebtoken"
const {sign, verify} = jwt
import { getTokenName, getTokenSecret } from "./env.js"

const createTokens = (user) => {
    const accessToken = sign(
        {
            username: user.username,
            user_id: user.user_id
        },
        getTokenSecret()
    )
    return accessToken
}

const validateToken = (req, res, next) => {

    const accessToken = req.cookies[getTokenName()]
    if (!accessToken) return res.json({error: true, message: "not authenticated!"})
    try {
        const validToken = verify(accessToken, getTokenSecret())
        if (validToken) {
            req.authenticated = true
            req.user_id = validToken.user_id
            return next()
        }
    } catch(err) {
        return res.status(400).json({error: err})
    }
}
const encryptToken = (token) => {
    if (!token) return {error: "TOKEN NOT THERE"}
    return verify(token, getTokenSecret())
}
export {
    createTokens,
    validateToken,
    encryptToken
}