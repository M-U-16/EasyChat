import express from "express";
const router = express.Router()
//importing authentication routes
import {
    loginRoute,
    logoutRoute,
    registerRoute,
    isAuthorized
} from "./auth/index.js"
//chat routes
import { chatRouter } from "./chats/User.chat.js";
//middleware for authentication
import validateToken from "../../middleware/auth/validateToken.js";

//authentication
router.use("/logout", logoutRoute)
router.use("/register", registerRoute)
router.use("/login", loginRoute)
router.get("/isLoggedIn", isAuthorized)
//chats
router.use("/chats", validateToken, chatRouter)

export { router as userRoute }