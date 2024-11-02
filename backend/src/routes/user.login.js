import express from "express"
import login from "../controllers/auth.login.js"

const loginRoute = express.Router()
loginRoute.post("/", login)

export default loginRoute