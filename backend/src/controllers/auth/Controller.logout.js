import { getTokenName } from "../../helpers/env.js"

//logout user
const logOut = (req, res) => {
    res.clearCookie(getTokenName(), {
        sameSite:"none",
        secure: true,
        httpOnly: true
    })
    res.json({error: false, message: "SUCCESSFULLY_LOGGED_OUT_USER"})
}

export default logOut