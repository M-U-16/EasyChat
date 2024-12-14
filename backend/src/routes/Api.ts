import express, { Request, Response } from "express";
import { userRouter } from "./UserRoutes.js";

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.sendStatus(200)
})
router.use("/user", userRouter)

export {router as apiRouter}