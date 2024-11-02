import express from "express"
import register from "../controllers/auth.register.js"

const registerRoute = express.Router()
registerRoute.post("/", register)

export default registerRoute