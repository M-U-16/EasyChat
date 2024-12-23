import path from "path"
import util from "util"
import {createLogger, format, transports } from "winston" 
const {combine, timestamp, printf} = format

const LOGGING_LEVEL = process.env.LOGGING_LEVEL
const LOGGING_FILES_PATH = process.env.LOGGING_FILES_PATH

let error_file: string, combined_file: string

if (LOGGING_FILES_PATH) {
    if (LOGGING_LEVEL == "error") {
        error_file = path.join(LOGGING_FILES_PATH, "error.log")
    } else {
        combined_file = path.join(LOGGING_FILES_PATH, "combined.log")
    }
}

const logFormat = combine(
    timestamp({
        format: "YYYY/DD/MM h:mm:s"
    }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    printf(({level, message, timestamp, metadata}) => {
        let out = `[${timestamp}] ${level.toUpperCase()}: ${message}`
        if (Object.keys(metadata).length > 0) {
            return util.format(out + " %O", metadata)
        }
        return out
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