import sqlite3 from "sqlite3";
import { DbAll, DbGet } from "./Db";

interface LastMessage {
    username: string;
    you: boolean;
    message: string;
    created_at: string;
}

interface Contact {
    username: string;
    room_id: number;
    lastMessage: LastMessage;
}

const SQL_GET_LAST_MESSAGE = `
SELECT users.username, users.user_id, message, created_at FROM messages INNER JOIN
users ON users.user_id = messages.user_id WHERE messages.room_id=?
AND message_id=max(messages.message_id) AND messages.room_id=?)
`

async function getLastMessage(db: sqlite3.Database, room_id: number, user_id: number): Promise<LastMessage> {
    //get the last message in the given room
    const lastMessage = await DbGet(db, SQL_GET_LAST_MESSAGE, [room_id, room_id])
    console.log(lastMessage)

    // check if there are any messages
    if (lastMessage == undefined) {
        return {
            username: "", created_at:"",
            you: false, message: ""
        }
    }

    lastMessage.you = lastMessage.user_id == user_id ? true : false
    return lastMessage
}

/* SQL QUERY: Get all rooms the user participates in */
const SQL_GET_CONTACTS_OF_USER = `
SELECT user.username, user.user_id, participants.room_id FROM users
INNER JOIN participants ON participants.user_id = users.user_id
WHERE participants.room_id IN (SELECT room_id FROM participants WHERE user_id=? GROUP BY room_id) AND user.user_id <> ?
`

export async function getContacts(
    db: sqlite3.Database,
    user_id: number,
): Promise<Contact[]|Error> {
    return new Promise(async function(resolve, reject) {
        const contacts = await DbAll(
            db, SQL_GET_CONTACTS_OF_USER,
            [user_id, user_id]
        )

        console.debug("getContacts: ", contacts)

        if (contacts instanceof Error) {
            return reject(contacts)
        }

        if (contacts.length == 0) {
            return resolve(new Array<Contact>(0))
        }

        resolve(Promise.all(contacts.map(async(user) => {
            return {
                username: user.username,
                lastMessage: await getLastMessage(db, user.room_id, user_id),
                newMessages: 0,
                room_id: user.room_id,
            }
        })))
    })
}