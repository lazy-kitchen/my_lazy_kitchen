import express from 'express';
import cors from 'cors';

import { index, show, create, update } from '../controller/ingredients'
import { corsOrigin } from '../config/configuration';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', index);
ingredientsRouter.get('/:id', show);

// ingredientsRouter.get('/ingredients/new');
ingredientsRouter.options('/', cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200
}));
ingredientsRouter.post('/', create);

// ingredientsRouter.get('/ingredients/edit');
ingredientsRouter.options('/:id', cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200
}));
ingredientsRouter.patch('/:id', update);


export default ingredientsRouter;