import jwt from "jsonwebtoken"
const {sign, verify} = jwt
import { getTokenSecret } from "./env.js"

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
const encryptToken = (token) => {
    if (!token) return {error: true, message: "TOKEN NOT THERE"}
    return verify(token, getTokenSecret())
}
export {
    createTokens,
    encryptToken
}