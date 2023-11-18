import { checkUser, addUser } from "../../models/user.js"

//register a new User
const register = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    checkUser(user)
        .then(check => {
            //check = true or false
            if (check.error) return res.json(check) //sends a error that user already exists
            if (!check.error) {
                addUser(user) // adds new user to db
                .then(addedUser => {
                    if (!addedUser) return res.send({
                        error: true, message: "COULD_NOT_ADD_USER"
                    })
                    return res.send({error: false, message: "ADDED_USER"})
                })
            }
        })
}
export default register