import path from "path"
import express, { Request, Response } from "express";
const router = express.Router()

//chat routes
import { DbGet } from "@/src/models/Db";
import { logout } from "@/src/controllers/Auth"
import { login } from "@/src/controllers/AuthLogin"
import { chatRouter } from "@/src/routes/UserChat"
import { GetGroups, searchUsers } from "@/src/controllers/User"
import { isAuthorized } from "@/src/helpers/AuthJwt";
import register from "@/src/controllers/AuthRegister"
import validateToken from "@/src/middleware/ValidateToken"
import { DbProvider } from "../middleware/DbProvider";

//authentication
router.post("/login", DbProvider, login)
router.post("/logout", logout)
router.post("/register", DbProvider, register)
router.get("/isLoggedIn", DbProvider, function(req: Request, res: Response): any {
    const accessToken = req.cookies[process.env.TOKEN_NAME]
    if (!accessToken) {
        return res.json({
            isAuthorized: false,
            redirect: true
        })
    }

    if (isAuthorized(accessToken)) {
        return res.json({
            isAuthorized: true,
        })
    } else {
        return res.json({
            isAuthorized: false,
            redirect: "/login"
        })
    }

})

router.get("/search", validateToken, DbProvider, searchUsers)
router.get("/username", validateToken, (req: Request, res: Response) => {
    res.json({username: req.username})
})

router.get("/profile/:username", DbProvider, async(req: Request, res: Response): Promise<any> => {
    const user = await DbGet(req.db,
        "select userDir from users where username=?",
        [req.params.username]
    )
    if (!user) {
        return res.status(404).send("404 Not Found")
    }
    
    const {userDir} = user
    const userpic = path.join(userDir, "profile.png")
    res.status(200).sendFile(userpic)
})
router.use("/chats", validateToken, chatRouter)
router.get("/groups", validateToken, DbProvider, GetGroups)

export { router as userRouter }