import { Router } from "express";
import {getContacts} from "../controllers/user.getContacts.js"
import {createChat} from "../controllers/user.createChat.js"

const router = Router()
router.get("/", getContacts)
router.post("/new-chat", createChat)

export { router as chatRouter }