import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
const { verify } = jwt

function validateToken(req: Request, res: Response, next: NextFunction): any {

    const accessToken = req.cookies[process.env.TOKEN_NAME]
    if (!accessToken) return res.json({error: true, message: "not authenticated!"})
    try {
        const validToken = verify(accessToken, process.env.TOKEN_SECRET)
        if (validToken) {
            req.authenticated = true
            req.username = validToken.username
            req.user_id = validToken.user_id
            return next()
        }
    } catch(err) {
        return next(new Error("TOKEN_NOT_VALID"))
    }
}

export default validateToken