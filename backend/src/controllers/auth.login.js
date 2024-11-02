import { createToken } from "../helpers/auth.jwt.js"
import { 
    findUser,
    comparePassHash
} from "../models/user.js"

//login user
async function login(req, res) {
    const inputPassword = req.body.password
    if (!inputPassword) return res.send({error: true, message: "PASSWORD_IS_REQUIRED" })
    if (!req.body.email) return res.send({error: true, message: "EMAIL_IS_REQUIRED"})

    const user = await findUser(req.body.email)
    if (!user) return res.send({error: true, message: "EMAIL_DOES_NOT_EXIST"})
        
    const doesMatch = await comparePassHash(inputPassword, user.password)
    if (!doesMatch) return res.json({error: true, message: "PASSWORD_IS_INCORRECT"})
    
    console.log("hallo")
    //removing old token
    res.clearCookie(process.env.TOKEN_NAME)
    //setting new cookie
    res.cookie(
        process.env.TOKEN_NAME,
        createToken(user),
        //cookie settings
        {
            maxAge: 31557600000,
            sameSite: "None",
            secure: true,
            httpOnly: true,
            path: "/",
        }
    )
    
    res.json({error: false, message: null})
}

export default login