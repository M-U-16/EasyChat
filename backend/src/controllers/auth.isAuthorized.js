import jwt from "jsonwebtoken"
const { verify } = jwt
import { logger } from "#root/logger.js"

const isAuthorized = (req, res) => {
    const accessToken = req.cookies[process.env.TOKEN_NAME]
    if (!accessToken) {
        return res.json({
            isAuthorized: false,
            redirect: true
        })
    }
    
    try {
        verify(accessToken, process.env.TOKEN_SECRET)
        return res.json({isAuthorized: true})
    } catch(err) {
        return res.json({
            isAuthorized: false,
            redirect: "/login"
        })
    }
}
export default isAuthorized