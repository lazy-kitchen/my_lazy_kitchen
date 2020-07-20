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
import Knex from "knex";
import {Model} from "objection";
import {dbInfo} from "./db/database";

// set up database connection
const knex = Knex(dbInfo);
Model.knex(knex);

const app = express();

// set up logger
export const logging = new Logging();
app.use(logging.requestLogger);
// set up global reference core logger for manual logging
app.set('logger', logging.logger);

app.use(methodOverride('X-HTTP-Method-Override'))

app.use(bodyParser.json())

app.use(cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200
}))
app.use('/', router);

// Handle any 404 errors
app.use(NotFoundHandler);
// Handle any errors during the request/response cycle
app.use(HTTPErrorHandler);

export default app;
