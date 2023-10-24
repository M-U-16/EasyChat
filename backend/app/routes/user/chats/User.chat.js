import { Router } from "express";
import {
    getContacts,
    getChat,
    createChat
} from "../../../controllers/user.chat.js";
const router = Router()

router.get("/", getContacts)
router.get("/contact", getChat)
router.post("/new-chat", createChat)


export { router as chatRouter }