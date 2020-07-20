import * as winston from 'winston';
import {format} from 'logform';
import path from 'path';
import morgan from 'morgan';
import { IncomingMessage, ServerResponse } from 'http';
import { existsSync, mkdirSync } from 'fs';
import { logging } from './configuration';

/**
 * Handles setting up and configuring logging infrastructure
 */
export default class Logging {
    readonly requestLogger: (req: IncomingMessage, res: ServerResponse, callback: (err?: Error) => void) => void;
    readonly logger: winston.Logger;

    constructor() {
        this.logger = Logging.setupWinston();
        this.requestLogger = Logging.setupMorgan(this.logger)
    }

    /**
     * Sets up logging infrastructure to work with the `morgan` request logging middleware
     *
     * @return {Handler<Request, Response>}
     */
    static setupMorgan(logger: winston.Logger) {

        const morganOptions = {
            stream: {
                write: (message: string) => {
                    logger.info(message);
                }
            }
        }

        return morgan('combined', morganOptions)
    }

    /**
     * Set up logging infrastructure through `winston`
     *
     * @return {winston.Logger}
     */
    static setupWinston() {
        return winston.createLogger({
            format: format.combine(
                format.timestamp(),
                format.simple()
            ),
            transports: [
                Logging.setupFileTransport(),
                Logging.setupConsoleTransport(),
            ],

            exitOnError: false
        });
    }

    /**
     * Set up logging transport for outputting logging messages to the Console
     *
     * @return {winston.transports.Console}
     */
    private static setupConsoleTransport() {
        return new winston.transports.Console({
            format: format.combine(
                format.timestamp(),
                format.colorize(),
                format.simple()
            ),
            level: 'debug',
            handleExceptions: true,
            // json: false,
            // colorize: true
        })
    }

    /**
     * Set up logging transport for outputting logging messages to a file
     *
     * @return {winston.transports.File}
     */
    private static setupFileTransport() {
        // ensure logging directory exists before sending logging messages to a log file there
        if (!existsSync(logging.logDirPath)) {
            mkdirSync(logging.logDirPath, { recursive: true })
        }

        return new winston.transports.File({
            format: format.combine(
                format.timestamp(),
                format.simple()
            ),
            level: 'info',
            filename: path.join(logging.logDirPath, `${process.env.NODE_ENV || 'development'}.log`),
            handleExceptions: true,
            // json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            // colorize: false
        });
    }
};

