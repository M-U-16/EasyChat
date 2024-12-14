import { Request, Response } from "express"

import { createToken } from "@/src/helpers/AuthJwt"
import { 
    findUser,
    comparePassHash
} from "@/src/models/User"

//login user
export async function login(req: Request, res: Response): Promise<any> {
    if (!req.db) {
        throw new Error("Request object has no database object")
    }
    
    const password = req.body.password

    if (!password) return res.send({error: true, message: "PASSWORD_IS_REQUIRED" })
    if (!req.body.email) return res.send({error: true, message: "EMAIL_IS_REQUIRED"})

    const user = await findUser(req.db, req.body.email)
    if (!user) return res.send({error: true, message: "EMAIL_DOES_NOT_EXIST"})
        
    const doesMatch = await comparePassHash(password, user.password)
    if (!doesMatch) return res.json({error: true, message: "PASSWORD_IS_INCORRECT"})
    
    //removing old token
    res.clearCookie(process.env.TOKEN_NAME)

    //setting new cookie
    res.cookie(
        process.env.TOKEN_NAME,
        createToken(user),
        //cookie settings
        {
            maxAge: 31557600000,
            sameSite: "none",
            secure: true,
            httpOnly: true,
            path: "/",
        }
    )
    
    return res.json({error: false, message: null})
}