import jwt from "jsonwebtoken"
const { verify } = jwt

const isAuthorized = (req, res) => {
    console.log(req.cookies)
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