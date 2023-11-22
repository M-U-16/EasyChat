import { createToken } from "../../helpers/JWT.js"
import { 
    findUser,
    comparePassHash
} from "../../models/user.js"

//login user
const login = async(req, res) => {
    //console.log(req.originalUrl)
    const inputPassword = req.body.password
    if (!inputPassword) return res.send({error: true, message: "PASSWORD IS REQUIRED!" })
    
    const user = await findUser(req.body.email)
        .then(res => res[0][0])
    if (!user) return res.send({error: true, message: "EMAIL_DOES_NOT_EXISTS"})
        
    const doesMatch = await comparePassHash(inputPassword, user.password)
    if (!doesMatch) return res.json({error: true, message: "PASSWORD_IS_INCORECT"})
            
    //removing old token
    res.clearCookie(process.env.TOKEN_NAME)
    //setting new cookie
    res.cookie(
        process.env.TOKEN_NAME,
        createToken(user),
        //cookie settings
        {
            maxAge:36000000,
            sameSite: "lax",
            secure: false,
            httpOnly: true,
            path: "/",
        }
                        
    )
    return res.json({error: false, message: null})      
}
export default login