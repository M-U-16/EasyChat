import path from "path"
import {createLogger, format, transports } from "winston" 
const {combine, timestamp, printf} = format

const LOGGING_LEVEL = process.env.LOGGING_LEVEL
const LOGGING_FILES_PATH = process.env.LOGGING_FILES_PATH
let error_file, combined_file

if (LOGGING_FILES_PATH) {
    error_file = path.join(LOGGING_FILES_PATH, "error.log")
    combined_file = path.join(LOGGING_FILES_PATH, "combined.log")
}

const logFormat = combine(
    timestamp(),
    printf(({level, message, timestamp}) => {
        return `${timestamp} ${level.toUpperCase()}: ${message}`
    })
)

const logger = createLogger({
    level: LOGGING_LEVEL ? LOGGING_LEVEL : "error",
    format: logFormat,
})

if (process.env.NODE_ENV !== "production") {
    logger.add(new transports.Console())
}

if (error_file) {
    logger.add(new transports.File({
        filename: error_file,
        level: "error"
    }))
}

if (combined_file) {
    logger.add(new transports.File({
        filename: combined_file,
    }))
}

export { logger }