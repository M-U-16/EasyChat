import express from "express";
const router = express.Router()
import {
    loginRoute,
    logoutRoute,
    registerRoute
} from "./user/auth/index.js"
import { chatRouter } from "./user/chats/User.chat.js";
import { validateToken } from "../helpers/JWT.js";

router.use("/logout", logoutRoute)
router.use("/register", registerRoute)
router.use("/login", loginRoute)
router.use("/chats", validateToken, chatRouter)

export { router as userRoute }