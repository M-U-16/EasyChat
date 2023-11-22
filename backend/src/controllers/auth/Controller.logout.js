//logout user
const logOut = (req, res) => {
    res.clearCookie(process.env.TOKEN_NAME, {
        sameSite:"none",
        secure: true,
        httpOnly: true
    })
    return res.json({error: false, message: "SUCCESSFULLY_LOGGED_OUT_USER"})
}

export default logOut