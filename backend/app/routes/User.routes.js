import express from "express";
const router = express.Router()
import { registerRoute } from "./user/auth/User.register.js";
import { loginRoute } from "./user/auth/User.login.js";
import { chatRouter } from "./user/chats/User.chat.js";
import { validateToken } from "../helpers/JWT.js";

router.use("/register", registerRoute)
router.use("/login", loginRoute)
router.use("/chats", validateToken, chatRouter)

export { router as userRoute }