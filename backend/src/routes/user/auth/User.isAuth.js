import { getTokenName, getTokenSecret } from "../../../helpers/env.js"
import jwt from "jsonwebtoken"
const { verify } = jwt

const isAuthorized = (req, res) => {
    const accessToken = req.cookies[getTokenName()]
    if (!accessToken) return res.json({isAuthorized: false, redirect: true})
    
    try {
        const validToken = verify(accessToken, getTokenSecret())
        return res.json({isAuthorized: true, redirect: false})
    } catch(err) {
        return res.json({isAuthorized: false, redirect: true})
    }
    
}

export default isAuthorized