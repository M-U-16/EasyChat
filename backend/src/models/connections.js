import sqlite3 from "sqlite3"
import { open_database } from "#root/src/models/db.js"
import { logger } from "#root/logger.js"
import { get_db_path } from "./default.js"

export const connection = open_database(
    get_db_path(),
    sqlite3.OPEN_READWRITE
)