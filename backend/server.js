import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import session from "express-session"
import cookieParser from "cookie-parser"

import { userRoute } from "./app/routes/User.routes.js"
import SERVER_CONFIG from "./app/config/server.conf.js"

import { validateToken } from "./app/helpers/JWT.js"

//creating express app
const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(session({
    secret: "12345$SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

//routes
app.use("/user", userRoute)

//index route
app.get("/", validateToken, (req, res) => {
    res.send({"message": "hello world"})
})

const startingServer = (hostname, port) => {
    console.log(`Server running at http://${hostname}:${port}`)
}
app.listen(
    SERVER_CONFIG.port,
    SERVER_CONFIG.hostname,
    startingServer(
        SERVER_CONFIG.hostname,
        SERVER_CONFIG.port,
    )
)