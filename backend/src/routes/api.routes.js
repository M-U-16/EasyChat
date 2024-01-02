import express from "express";
const router = express.Router()
import { userRoute } from "./user/User.routes.js";
router.use("/user", userRoute)
export {router as apiRoute}