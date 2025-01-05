import { Request, Response } from "express"
import { DbAll, DbGet } from "@/src/models/Db"
import { getContacts } from "@/src/models/Contacts"
import { logger } from "../logger"
import { getGroups } from "../models/Groups"

export async function searchUsers(req: Request, res: Response) {
    if (!req.db) {
        throw Error("req.db not accessible")
    }
    
    const user = req.query.username
    const users = await DbAll(req.db,
        "select username, user_id from users "+
        "where username like ? || '%' and username != ? limit 15",
        [user, req.username]
    )
    
    res.send({users: users, query: user})
}

export async function GetContacts(req: Request, res: Response): Promise<any> {
    if (!req.db) throw Error("req.db not accessible")
        
    try {
        const contacts = await getContacts(req.db, req.user_id)
        logger.debug("GetContacts:", {contacts: contacts})
        if (contacts instanceof Error) {
            throw new Error()
        }

        if (contacts.length == 0) {
            return res.json({
                error: true,
                contacts: [],
                message: "NO_CONTACTS_FOR_THIS_USER"
            })        
        }
        return res.json({error: false, contacts: contacts})

    } catch(err) {
        res.json({error: true, message: "ERROR_LOADING_CONTACTS"})
        logger.error("GetContacts:", {error: err})
    }
}

export async function GetGroups(req: Request, res: Response): Promise<any> {
    if (!req.db) throw Error("req.db not accessible")
    
    try {
        const groups = await getGroups(req.db, req.user_id)
        logger.debug("GetGroups:", {groups: groups})

        if (groups instanceof Error) {
            throw groups
        }

        if (groups.length == 0) {
            return res.json({
                error: true,
                groups: [],
                message: "NO_GROUPS_FOR_THIS_USER"
            })
        }

        return res.json({error: false, groups: groups})
        
    } catch(err) {
        res.json({error: true, message: "ERROR_LOADING_GROUPS"})
        logger.error("GetGroups:", {error: err})
    }
}