const {sign, verify} = jwt
import jwt from "jsonwebtoken"

export function createToken(user) {
    const accessToken = sign(
        {
            username: user.username,
            user_id: user.user_id
        },
        process.env.TOKEN_SECRET
    )
    return accessToken
}

export function encryptToken(token) {
    if (!token) return {error: true, message: "TOKEN NOT THERE"}
    return verify(token, process.env.TOKEN_SECRET)
}