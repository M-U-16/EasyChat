import fs from "fs"
import child_process from "child_process"

import { checkUser, addUser } from "../models/user.js"
import path from "path"

//register a new User
async function register(req, res) {
    
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        dir: ""
    }
    
    // checks if the users already exists or not
    const check = await checkUser(user)
    if (check.error) return res.json(check) //sends a error that user already exists
    
    user.dir = path.join(
        process.env.DATA_DIR,
        "users",
        user.username
    )
    fs.mkdirSync(user.dir)

    const profile_process = child_process.fork(
        "src/helpers/user.create-picture.js"
    )

    profile_process.send({
        username: user.username,
        userDir: user.dir
    })

    // adds new user to db
    addUser(user).then(userAdded => {
        if (!userAdded) return res.send({
            error: true,
            message: "COULD_NOT_ADD_USER"
        })

        res.send({
            error: false,
            message: "ADDED_USER"
        })

        return
    })
}

export default register