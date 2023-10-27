const validateToken = (req, res, next) => {

    const accessToken = req.cookies[getTokenName()]
    if (!accessToken) return res.json({error: true, message: "not authenticated!"})
    try {
        const validToken = verify(accessToken, getTokenSecret())
        if (validToken) {
            req.authenticated = true
            req.user_id = validToken.user_id
            return next()
        }
    } catch(err) {
        return res.status(400).json({error: err})
    }
}
export default validateToken