import path from "path"
import express, { Request, Response } from "express";

import { logger } from "@/src/logger";
import { userRouter } from "@/src/routes/UserRoutes";
import { DbProvider } from "@/src/middleware/DbProvider";
import { DbGet } from "../models/Db";

const groupRouter = express.Router()
groupRouter.get("/profile/:id", DbProvider, async(req: Request, res: Response): Promise<any> => {
    const room = await DbGet(req.db,
        "SELECT room_hash as hash FROM rooms WHERE room_id=?",
        [req.params.id]
    )
    if (!room) {
        return res.status(404).send("404 Not Found")
    }

    if (room instanceof Error) {
        return res.status(500).json({error: true, message: "INTERNAL_SERVER_ERROR"})
    }

    logger.debug("Api.ts: hash=", {hash: room.hash})
    
    try {
        const userpic = path.join(
            process.env.DATA_DIR,
            "groups",
            room.hash,
            "profile.png"
        )
        res.status(200).sendFile(userpic)
    } catch(err) {
        res.status(404).json({
            error:true,
            message: "ERROR_LOADING_GROUP_PROFILE"
        })
    }
})

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.sendStatus(200)
})
router.use("/user", userRouter)
router.use("/group", groupRouter)

export {router as apiRouter}