import connection from "../../database/db.js"
import { encryptToken } from "../../helpers/JWT.js"

const contacts = [
    {
        username: "deez-nuts",
        lastMessage: {
            username: "You",
            message: "helisfj kfjidjfkd?"
        },
        newMessages: 0,
        status: false
    },
    {
        username: "deez-nuts",
        lastMessage: {
            username: "You",
            message: "helisfj kfjidjfkd?"
        },
        newMessages: 1,
        status: true
    }
]
const errortest = {}

const getContacts = async(req, res) => {

    const token = req.cookies["access-token-web-chat"]
    /* console.log(encryptToken(token)) */
    
    setTimeout(() => {
        res.json({contacts: contacts})
    }, 500);
}
export default getContacts