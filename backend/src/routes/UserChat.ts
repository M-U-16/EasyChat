import { Router } from "express";
import {createChat} from "@/src/controllers/UserCreateChat"
import {GetContacts, GetGroups} from "@/src/controllers/User"
import validateToken from "@/src/middleware/ValidateToken";
import { DbProvider } from "@/src/middleware/DbProvider";

const router = Router()
router.get("/", validateToken, DbProvider, GetContacts)
router.post("/new-chat", validateToken, DbProvider, createChat)

export { router as chatRouter }