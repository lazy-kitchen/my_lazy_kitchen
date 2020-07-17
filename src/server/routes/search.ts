import express from 'express';

import { index } from '../controller/searches';

const searchRouter = express.Router();

searchRouter.get('/', index);

export default searchRouter;