import { getDbPassword } from "../helpers/env.js"

export default {
    host: "localhost",
    user: "root",
    password: getDbPassword(),
    database: "chatapp"
}