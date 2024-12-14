import { NextFunction, Request, Response } from "express";
import sqlite3 from "sqlite3"

export function DbProvider(req: Request, res: Response, next: NextFunction) {
    req.db = req.app.get("db") as sqlite3.Database
    next()
}