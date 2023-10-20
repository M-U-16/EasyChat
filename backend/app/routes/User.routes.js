import express from "express";
const router = express.Router()
import { registerRoute } from "./user/User.register.js";
import { loginRoute } from "./user/User.login.js";
import { contactRouter } from "./user/User.chat.js";

router.use("/register", registerRoute)
router.use("/login", loginRoute)
router.use("/contacts", contactRouter)


export { router as userRoute }