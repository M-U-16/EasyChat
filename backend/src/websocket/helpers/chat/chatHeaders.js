import { parse, serialize } from "cookie"
import { v4 as uuidv4 } from "uuid"

const setChatHeaders = (headers, req) => {
    if (!req.headers.cookie) return
    const cookies = parse(req.headers.cookie)
    if (!cookies.randomId) {
        headers["set-cookie"] = serialize("randomId", uuidv4(), { maxAge: 86400 })
    }
}
export default setChatHeaders