import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import methodOverride from 'method-override'

import Logging from './config/logging';
import router from './config/routing';
import {
    HTTPErrorHandler,
    NotFoundHandler
} from './middleware/error';
import { corsOrigin} from './config/configuration';
import { connection } from "./db/database";

const app = express();

// set up logger
export const logging = new Logging();
app.use(logging.requestLogger);
// set up global reference core logger for manual logging
app.set('logger', logging.logger);
// set up global reference to main database connection
connection.then((conn) => {
    app.set('db_connection', conn);
})

app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cors({
    origin: corsOrigin,
    methods: ['POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['X-HTTP-Method-Override'],
    optionsSuccessStatus: 200,
    preflightContinue: true
}))


app.use(bodyParser.json())


app.use('/', router);

// Handle any 404 errors
app.use(NotFoundHandler);
// Handle any errors during the request/response cycle
app.use(HTTPErrorHandler);

// todo revisit user input escaping more comprehensively

export default app;
