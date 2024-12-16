import express, { Request, Response } from "express";
import { logger } from "@/src/logger";
import { userRouter } from "./UserRoutes";

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    logger.debug("user send request to /")
    res.sendStatus(200)
})
router.use("/user", userRouter)

export {router as apiRouter}