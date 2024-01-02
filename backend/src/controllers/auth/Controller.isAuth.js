import jwt from "jsonwebtoken"
const { verify } = jwt

const isAuthorized = (req, res) => {
    const accessToken = req.cookies[process.env.TOKEN_NAME]
    if (!accessToken) return res.json({isAuthorized: false, redirect: true})
    
    try {
        const validToken = verify(accessToken, process.env.TOKEN_SECRET)
        return res.json({isAuthorized: true, redirect: false})
    } catch(err) {
        return res.json({isAuthorized: false, redirect: true})
    }
    
}
export default isAuthorized