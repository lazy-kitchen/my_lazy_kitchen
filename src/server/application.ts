import express from 'express';

import Logging from './config/logging';
import router from './config/routing';
import {
    HTTPErrorHandler,
    NotFoundHandler
} from "./middleware/error";

const app = express();

// set up logger
const logging = new Logging();
app.use(logging.logger);

app.use('/', router);

// Handle any 404 errors
app.use(NotFoundHandler);
// Handle any errors during the request/response cycle
app.use(HTTPErrorHandler);

export default app;
