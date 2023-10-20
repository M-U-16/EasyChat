import { checkUser, addUser } from "../../models/user.model.js"

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
export default register