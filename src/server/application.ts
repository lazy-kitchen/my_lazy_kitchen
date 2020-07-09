import express from 'express';
import Logging from './config/logging';

const app = express();

// set up logger
const logging = new Logging();
app.use(logging.logger);

const router = express.Router();
app.use('/', router);

export default app;
