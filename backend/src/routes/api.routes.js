import express from "express";
const router = express.Router()
import { userRoute } from "./user/User.routes.js";
import { registerChatHandler } from "../websocket/handlers/handler.chat.js";
import { auth } from "../websocket/middleware/socket-auth.js";

router.use("/user", userRoute)

export {router as apiRoute}

/* 
//sockets
io.of("/chat").use(auth)
io.of("/").on("connection", () => console.log("user connected"))
io.of("/chat", (socket) => registerChatHandler(io, socket))

*/