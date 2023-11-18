import { joinRoom } from "../helpers.js"
import { encryptToken } from "../../../helpers/JWT.js"
import getChat from "../helper.getChat.js"

const joinRoomEvent = async(socket, data, callback) => {
    console.log(socket)
    const cookieRegex = /=(.*)/
    const TOKEN = socket.handshake.headers.cookie.match(cookieRegex)[1]
    const user_id = encryptToken(TOKEN).user_id
    const room = data.room_id
    joinRoom(socket, room, user_id)
    callback(await getChat(room, user_id))
}
export default joinRoomEvent