import { Router } from "express";
import {
    getContacts,
    createChat
} from "../../../controllers/user.chat.js";
const router = Router()

router.get("/", getContacts)
router.post("/new-chat", createChat)


export { router as chatRouter }