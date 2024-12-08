import { Router } from "express";
import {createChat} from "@/src/controllers/UserCreateChat"
import {GetContacts} from "@/src/controllers/User"

const router = Router()
router.get("/", GetContacts)
router.post("/new-chat", createChat)

export { router as chatRouter }