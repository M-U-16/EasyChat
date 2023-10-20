/* import jsonwebtoken from "jsonwebtoken"; */
import jwt from "jsonwebtoken"
const {sign, verify} = jwt

const createTokens = (user) => {
    const accessToken = sign(
        {
            username: user.username,
            user_id: user.user_id
        },
        "my_secrect"
    )
    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token-web-chat"]

    if (!accessToken)
        return res.status(400).json({error: "not authenticated!"})

    try {
        const validToken = verify(accessToken, "my_secrect")
        /* console.log(validToken) */
        if (validToken) {
            req.authenticated = true
            return next()
        }
    } catch(err) {
        return res.status(400).json({error: err})
    }
}
const encryptToken = (token) => {
    if (!token) return {error: "TOKEN NOT THERE OR WRONG"}
    return verify(token, "my_secrect")
}

export {
    createTokens,
    validateToken,
    encryptToken
}