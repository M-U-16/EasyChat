import jwt from "jsonwebtoken"
const {sign, verify} = jwt

import { User } from "@/src/controllers/Auth"

export function createToken(user: User) {
    const accessToken = sign(
        {
            username: user.username,
            user_id: user.user_id
        },
        process.env.TOKEN_SECRET
    )
    return accessToken
}

export function decryptToken(token: string) {
    if (!token) return new Error("NO_TOKEN_PROVIDED")
    return verify(token, process.env.TOKEN_SECRET)
}

export function isAuthorized(cookie: string): boolean {
    try {
        verify(cookie, process.env.TOKEN_SECRET)
        return true
    } catch(err) {
        return false
    }
}