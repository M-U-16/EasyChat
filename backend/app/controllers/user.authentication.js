import { createTokens } from "../helpers/JWT.js"
import { 
    checkUser,
    addUser,
    findUser,
    comparePassHash
} from "../models/user.model.js"

//register a new User
const register = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    checkUser(user)
    .then(check => {
        if (check.error) {
            //sends a error that user already exists
            res.json(check)

        } else if (!check.error) {
            addUser(user) // adds new user to db
            .then(addedUser => {
                if (addedUser) res.send({error: false, message: "ADDED_USER"})
                if (!addedUser) res.send({ error: true, message: "COULD_NOT_ADD_USER"})
            })
        }
    })
}

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

const logOut = (req, res) => {

}

export {
    register,
    login
}