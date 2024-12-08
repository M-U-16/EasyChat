import sqlite3 from "sqlite3"

interface OnlineUsersStorage {
    db: sqlite3.Database;
    print(): void;
    inc(room: number): Promise<Error|number>;
    dec(room: number): Promise<Error|null|number>;
    update(room: number, users: number): Promise<Error|null>;
    get(room: number): Promise<Error|number>;
    set(room: number, users: number): Promise<Error|null>;
}

export function NewOnlineStorage(): OnlineUsersStorage {
    const db = new sqlite3.Database(":memory:")
    db.exec("CREATE TABLE rooms (room INTEGER UNIQUE, online INTEGER)")

    async function get(room: number): Promise<Error|number> {
        return new Promise(function(resolve, reject) {
            db.get("SELECT online FROM rooms WHERE room=?",
                [room], 
                function(err: Error|null, row: any) {
                    if (err) {
                        /* console.error("get error:", err) */
                        reject(err)
                    } else {
                        /* console.log("get:", row.online) */
                        resolve(row.online)
                    }
                }
            )
        })
    }

    async function set(room: number, users: number): Promise<Error|null> {
        return new Promise(function(resolve, reject) {
            db.run("INSERT INTO rooms (room, online) VALUES (?, ?)",
                [room, users],
                function(err: Error|null) {
                    if (err) {
                        /* console.error(err) */
                        reject(err)
                    } else {
                        /* console.log(result) */
                        resolve(null)
                    }
                }
            )
        })
    }

    async function update(room: number, users: number): Promise<Error|null> {
        return new Promise(function(resolve, reject) {
            db.run(
                "UPDATE rooms SET online=? WHERE room=?",
                [users, room],
                function(err: Error | null) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(null)
                    }
                }
            )
        })
    }

    async function inc(room: number): Promise<Error|number> {
        return new Promise(function(resolve, reject) {
            db.serialize(() => {
                db.run(
                    "UPDATE rooms SET online=online+1 WHERE room=?",
                    [room], function(err: Error | null) {
                        if (err) {
                            reject(err)
                        }
                    }
                )

                db.get(
                    "SELECT online FROM rooms WHERE room=?",
                    [room], function(err: Error, row: any) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(row.online)
                        }
                    }
                )
            })
        })
    }
    
    async function dec(room: number): Promise<Error|number> {
        return new Promise(function(resolve, reject) {
            db.serialize(function() {
                db.run(
                    "UPDATE rooms SET online=iif(online-1>0, online-1, 0) WHERE room=?",
                    [room], function(err: Error | null) {
                        if (err) {
                            reject(err)
                        }
                    }
                )

                db.get(
                    "SELECT online FROM rooms WHERE room = ?",
                    [room], function(err: Error, row: any) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(row.online)
                        }
                    }
                )
            })
        })
    }

    function print() {
        db.all("SELECT * FROM rooms", (err: Error|null, rows: unknown[]) => {
            if (err) {
                console.log("print error:", err)
            } else {
                console.log("print result:", rows)
            }
        })
    }

    return {
        db,
        get, set,
        inc, dec,
        print,
        update,
    }
}