import express from "express";
const router = express.Router()
//importing authentication routes
import {
    loginRoute,
    logoutRoute,
    registerRoute,
    isAuthorized
} from "./user/auth/index.js"
//chat routes
import { chatRouter } from "./user/chats/User.chat.js";
//middleware for authentication
import validateToken from "../middleware/auth/validateToken.js";

//authentication
router.use("/logout", logoutRoute)
router.use("/register", registerRoute)
router.use("/login", loginRoute)
router.get("/isLoggedIn", isAuthorized)
//chats
router.use("/chats", validateToken, chatRouter)

//exportin everything as userRoute
export { router as userRoute }