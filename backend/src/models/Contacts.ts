import sqlite3 from "sqlite3"
import { DbAll, DbGet } from "@/src/models/Db"
import { LastMessage, getLastMessage } from "@/src/models/LastMessage"

interface Contact {
    username: string;
    room_id: number;
    lastMessage: LastMessage;
}

/* SQL QUERY: Get all rooms the user participates in */
const SQL_GET_CONTACTS_OF_USER = `SELECT users.username, users.user_id, participants.room_id
FROM users INNER JOIN participants ON participants.user_id = users.user_id
WHERE participants.room_id IN 
(SELECT participants.room_id FROM participants INNER JOIN rooms ON participants.room_id=rooms.room_id WHERE participants.user_id=? AND rooms.isContact=1)
AND users.user_id!=?`

/*
INNER JOIN rooms ON rooms.room_id = participants.room_id
AND rooms.isContact=1
*/
export async function getContacts(
    db: sqlite3.Database,
    user_id: number,
): Promise<Contact[]|Error> {
    return new Promise(async function(resolve, reject) {
        
        try {
            let contacts = await DbAll(
                db, SQL_GET_CONTACTS_OF_USER,
                [user_id, user_id]
            )

            if (contacts instanceof Error) {
                throw contacts
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

        } catch(err) {
            reject(err)
        }
        
    })
}