import { createTokens } from "../helpers/JWT.js"
import { 
    findUser,
    comparePassHash
} from "../models/user.model.js"

//login user
const login = (req, res) => {
    const inputPassword = req.body.password

    console.log(inputPassword)
    if (!inputPassword) {
        res.send({error: true, message: "PASSWORD IS REQUIRED!" })
    } else {

        findUser(req.body.email)
        .then(result => result[0][0])
        .then(user => {
            if (!user) {
                res.send({error: true, message: "EMAIL_DOES_NOT_EXISTS"})
            }
            if (user) {
                comparePassHash(inputPassword, user.password)
                .then(doesMatch => {
                    if (!doesMatch) res.json({error: true, message: "PASSWORD_IS_INCORECT"})
                    if (doesMatch) {
                        const token = createTokens(user)
                        res.cookie(
                            "access-token-web-chat",
                            token, 
                            { maxAge: 3600000, httpOnly: true }      
                        )
                        res.json({error: false, message: null})
                    }
                })
            }
        })

    }
}
export default login