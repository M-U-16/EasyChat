import sqlite3 from "sqlite3"

export interface OnlineUserStorage {
    print(): void;
    get_rooms(user_id: number): Promise<any[]>
    get_online(room: number): Promise<number|Error>
    get_online_id(room: number, user_id: number): Promise<number|Error>
    has(user_id: number): Promise<boolean|null>
    get(room: number): Promise<Error|number|null>
    set(room: number, user_id: number): Promise<void>
    remove(user_id: number): Promise<Error|null|number>;
}

export function NewOnlineStorage(): OnlineUserStorage {
    const db = new sqlite3.Database(":memory:")
    db.exec("CREATE TABLE online (user_id INTEGER, room_id INTEGER)")

    async function get(user_id: number): Promise<Error|null> {
        return new Promise(function(resolve, reject) {
            db.get("SELECT * FROM online WHERE user_id=?",
                [user_id], 
                function(err: Error|null, row: any) {
                    if (err) {
                        /* console.error("get error:", err) */
                        reject(err)
                    } else {
                        /* console.log("get:", row.online) */
                        if (!row) {
                            return resolve(null)
                        }
                        resolve(row.online)
                    }
                }
            )
        })
    }

    async function get_rooms(user_id: number): Promise<any[]> {
        return new Promise(function(resolve, reject) {
            db.all("SELECT room_id FROM online WHERE user_id=?",
                [user_id],
                function(err: Error|null, rows: any[]) {
                    if (err) {
                        return reject(err)
                    }
                    
                    if (rows.length == 0) {
                        return resolve([])
                    }

                    resolve(rows.map(room=>room.room_id))
                }
            )
        })
    }



    async function get_online(room: number): Promise<number|Error> {
        return new Promise(function(resolve, reject) {
            db.get("SELECT COUNT(user_id) as users_online FROM online WHERE room_id=?", [room],
                function(err: Error|null, row: any) {
                    if (err) {
                        return reject(err)
                    }
                    resolve(row.users_online)
                }
            )
        })
    }
    
    async function get_online_id(room: number, user_id: number): Promise<number|Error> {
        return new Promise(function(resolve, reject) {
            db.get("SELECT COUNT(user_id) as users_online FROM online WHERE room_id=? and user_id!=?", [room, user_id],
                function(err: Error|null, row: any) {
                    if (err) {
                        return reject(err)
                    }
                    resolve(row.users_online)
                }
            )
        })
    }

    async function set(room: number, user_id: number): Promise<void> {
        const SQL_INSERT_UPDATE = `INSERT INTO online(user_id, room_id) VALUES(?, ?)`

        try {
            db.run(SQL_INSERT_UPDATE, [user_id, room],
                function(err: Error | null) {
                    if (err) {
                        throw err
                    }
                }
            )
            return
        } catch(err) {
            return
        }
    }
    
    async function remove(user_id: number): Promise<Error|null> {
        return new Promise(function(resolve, reject) {
            db.run(
                "DELETE FROM online WHERE user_id=?",
                [user_id], function(err: Error | null) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(null)
                    }
                }
            )
        })
    }

    async function has(user_id: number): Promise<boolean|null> {
        try {
            const online = await new Promise<boolean>(function(resolve, reject) {
                db.get("SELECT * FROM online WHERE user_id=?", user_id,
                    function(err: Error|null, row: any) {
                        if (err) {
                            return reject(err)
                        }
                    
                        if (!row) {
                            return resolve(false)
                        }

                        resolve(true)
                    }
                )
            })

            return online
        } catch(err) {
            return null
        }
    }

    function print() {
        db.all("SELECT * FROM online", (err: Error|null, rows: unknown[]) => {
            if (err) {
                console.log("print error:", err)
            } else {
                console.log("print result:", rows)
            }
        })
    }

    return {
        has, get, set,
        get_rooms, get_online, get_online_id,
        remove,
        print,
    }
}