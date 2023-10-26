import { createTokens } from "../../helpers/JWT.js"
import { getTokenName } from "../../helpers/env.js"
import { 
    findUser,
    comparePassHash
} from "../../models/user.js"

//login user
const login = (req, res) => {
    const inputPassword = req.body.password

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
                        res.clearCookie(getTokenName())
                        res.cookie(
                            getTokenName(),
                            token,
                            {
                                maxAge:36000000,
                                sameSite:"none",
                                secure: true,
                                httpOnly: true
                            }
                        )
                        res.json({error: false, message: null})
                    }
                })
            }
        })

    }
}
export default login