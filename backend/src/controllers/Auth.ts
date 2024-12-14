import sqlite3 from "sqlite3";
import { Request, Response } from "express"

export interface User {
    username: string;
    password: string;
    email: string;
    dir: string;
    user_id?: number|null;
    db?: sqlite3.Database;
}

export function logout(req: Request, res: Response): any {
    res.clearCookie(process.env.TOKEN_NAME, {
        sameSite:"none",
        secure: true,
        httpOnly: true
    })
    return res.json({error: false, message: "SUCCESSFULLY_LOGGED_OUT_USER"})
}