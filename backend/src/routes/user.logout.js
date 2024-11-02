import express from "express"
import logOut from "../controllers/auth.logout.js"

const logoutRoute = express.Router()
logoutRoute.post("/", logOut)

export default logoutRoute