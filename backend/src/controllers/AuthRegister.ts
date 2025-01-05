import fs from "fs"
import path from "path"
import child_process from "child_process"
import { Request, Response } from "express"

import { User } from "@/src/controllers/Auth"
import { checkUser, addUser } from "@/src/models/User"
import { logger } from "@/src/logger"

//register a new User
async function register(req: Request, res: Response): Promise<any> {
    if (!req.db) throw Error("req.db not provided")
    logger.debug("register: ", {body: req.body})

    const user: User = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        dir: ""
    }
    
    // checks if the users already exists or not
    const check = await checkUser(req.db, user)
    if (check.error) return res.json(check) //sends a error that user already exists
    
    user.dir = path.join(
        process.env.DATA_DIR,
        "users",
        user.username
    )
    fs.mkdirSync(user.dir, {recursive: true})

    const profile_process = child_process.fork(
        "src/helpers/UserCreatePicture.js"
    )

    profile_process.send({
        username: user.username,
        path: user.dir
    })

    // adds new user to db
    addUser(req.db, user).then(userAdded => {
        if (!userAdded) return res.json({
            error: true,
            message: "COULD_NOT_ADD_USER"
        })

        return res.json({
            error: false,
            message: "ADDED_USER"
        })
    })
}

export default register