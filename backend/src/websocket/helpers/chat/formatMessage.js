import { getUsername } from "../../../models/db.js"
const formatMessage = async(message, date, user_id, uuid=null, is_you=false) => {
    const username = await getUsername(user_id)
    return {
        message: message,
        creation_date: date,
        user_id: user_id,
        username: username,
        uuid: uuid,
        you: is_you
    }
}
export default formatMessage