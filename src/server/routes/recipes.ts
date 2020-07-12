import express from 'express';
import cors from 'cors';

import { index, show, create, update } from '../controller/recipes'
import {corsOrigin} from '../config/configuration';

const recipesRouter = express.Router();

recipesRouter.get('/', index);
recipesRouter.get('/:id', show);

// recipesRouter.get('/recipes/new');
recipesRouter.options('/', cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200
}));
recipesRouter.post('/', create);

// recipesRouter.get('/recipes/edit');
recipesRouter.options('/:id', cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200
}));
recipesRouter.patch('/:id', update);


export default recipesRouter;