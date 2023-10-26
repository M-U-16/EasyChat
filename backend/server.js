import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import session from "express-session"
import http from "http"

import SERVER_CONFIG from "./app/config/server.conf.js"
import { validateToken } from "./app/helpers/JWT.js"
import { userRoute } from "./app/routes/User.routes.js"

//creating express app
const app = express()

//cors options
const whitelist = ["http://127.0.0.1:5173"]
const corsOptions = {
    credentials: true,
    exposedHeaders: [
        "Set-Cookie",
        "Authorization",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept"
    ],
    origin: "http://127.0.0.1:5173"
}

//middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
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

const server = http.createServer(app)

server.listen(
    SERVER_CONFIG.port,
    SERVER_CONFIG.hostname,
    startingServer(
        SERVER_CONFIG.hostname,
        SERVER_CONFIG.port,
    )
)