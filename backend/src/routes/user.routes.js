import path from "path"
import express, { query } from "express";
const router = express.Router()

//chat routes
import { chatRouter } from "./user.chat.js";

//middleware for authentication
import validateToken from "../middleware/auth.validateToken.js";
import isAuthorized from "../controllers/auth.isAuthorized.js";
import { queryDb } from "../models/db.js";
import register from "../controllers/auth.register.js";
import logOut from "../controllers/auth.logout.js";
import login from "../controllers/auth.login.js";
import { searchUsers } from "../controllers/user.searchUsers.js";

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