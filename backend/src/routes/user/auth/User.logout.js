import express from "express"
import { logOut } from "../../../controllers/user.authentication.js"

const logoutRoute = express.Router()
logoutRoute.post("/", logOut)

export default logoutRoute