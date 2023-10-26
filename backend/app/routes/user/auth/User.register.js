import express from "express"
import { register } from "../../../controllers/user.authentication.js"

const registerRoute = express.Router()
registerRoute.post("/", register)

export default registerRoute