import sqlite3 from "sqlite3"
import { DbAll } from "@/src/models/Db"
import { LastMessage, getLastMessage } from "@/src/models/LastMessage";
import { logger } from "../logger";

interface Group {
    name: string;
    room_id: number;
    newMessages: number;
    lastMessage: LastMessage;
}

const SQL_GET_GROUPS_OF_USER = `SELECT rooms.room_id, rooms.room_name
FROM users INNER JOIN participants ON participants.user_id = users.user_id
INNER JOIN rooms ON rooms.room_id=participants.room_id
WHERE participants.room_id IN 
(SELECT participants.room_id FROM participants INNER JOIN rooms ON participants.room_id=rooms.room_id WHERE participants.user_id=? AND rooms.isContact=0)
AND users.user_id!=? GROUP BY rooms.room_id`

export async function getGroups(db: sqlite3.Database, user_id: number): Promise<Error|Group[]> {
    return new Promise(async function(resolve, reject) {
        try {
            const groups = await DbAll(db, SQL_GET_GROUPS_OF_USER, [user_id, user_id])
            if (groups instanceof Error) {
                throw groups
            }

            logger.debug("getGroups:", {groups: groups})

            if (groups.length == 0) {
                return resolve(new Array<Group>(0))
            }

            resolve(Promise.all(groups.map(async(group): Promise<Group> => {
                return {
                    name: group.room_name,
                    lastMessage: await getLastMessage(db, group.room_id, user_id),
                    newMessages: 0,
                    room_id: group.room_id,
                }
            })))

        } catch(err) {
            logger.error("getGroups:", {error: err})
            reject(err)
        }

    })
}