import * as dotenv from "dotenv"
dotenv.config()

const getTokenName = () => process.env.TOKEN_NAME
const getTokenSecret = () => process.env.TOKEN_SECRET
const getDbPassword = () => process.env.DB_PASSWORD

export {
    getTokenName,
    getTokenSecret,
    getDbPassword
}