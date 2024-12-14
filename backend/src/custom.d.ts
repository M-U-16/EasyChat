import sqlite3 from "sqlite3";

declare global{
    namespace Express {
        export interface Request {
            user_id: number;
            username: string;
            db?: sqlite3.Database|undefined;
            authenticated: boolean;
        }
    }
}