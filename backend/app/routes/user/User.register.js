import express from "express"
import { register } from "../../controllers/user.authentication.js"

const router = express.Router()
router.post("/", register)

export { router as registerRoute }