import express from "express"
import { login } from "../../../controllers/user.authentication.js"

const router = express.Router()
router.post("/", login)

export { router as loginRoute }