import path from "path"
import express from "express";
const router = express.Router()

//chat routes
import { chatRouter } from "./user.chat.js";

//middleware for authentication
import validateToken from "#root/src/middleware/auth.validateToken.js";
import isAuthorized from "#root/src/controllers/auth.isAuthorized.js";
import { queryDb } from "#root/src/models/db.js";
import register from "#root/src/controllers/auth.register.js";
import logOut from "#root/src/controllers/auth.logout.js";
import login from "#root/src/controllers/auth.login.js";
import { searchUsers } from "#root/src/controllers/user.searchUsers.js";

//authentication
router.use("/login", login)
router.use("/logout", logOut)
router.use("/register", register)
router.get("/isLoggedIn", isAuthorized)
router.get("/search/", validateToken, searchUsers)

router.get("/username", validateToken, (req, res) => {
    res.json({username: req.username})
})

router.get("/profile/:username", validateToken, async(req, res) => {

    const user = (await queryDb(
        "select userDir from users where username=?",
        [req.params.username]
    ))[0]
    if (!user) {
        return res.status(404).send("404 Not Found")
    }
    const {userDir} = user
    const userpic = path.join(userDir, "profile.png")

    res.status(200).sendFile(userpic)
})

router.use("/chats", validateToken, chatRouter)

export { router as userRoute }