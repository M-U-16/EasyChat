import express from "express"
import { login } from "../../../controllers/user.authentication.js"

const loginRoute = express.Router()
loginRoute.post("/", login)

export default loginRoute