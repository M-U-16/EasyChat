import express from "express";
const router = express.Router()
import { userRoute } from "./user.routes.js";

router.use("/user", userRoute)
router.post("/test", (req, res) => {
    console.log(req.body)
    res.status(200).send("ok")
})
export {router as apiRoute}