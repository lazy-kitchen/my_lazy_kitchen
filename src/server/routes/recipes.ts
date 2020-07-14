import express from 'express';
import cors from 'cors';

import { index, show, create, update } from '../controller/recipes'
import { corsOrigin } from '../config/configuration';
import { validateNewRecipeParams, validateUpdateRecipeParams } from '../middleware/validator/recipe';

const recipesRouter = express.Router();

recipesRouter.get('/', index);
recipesRouter.get('/:id', show);

recipesRouter.options('/', cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200
}));
recipesRouter.post(
    '/',
    [
        ...validateNewRecipeParams,
        create
    ]);

recipesRouter.options('/:id', cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200
}));
recipesRouter.patch(
    '/:id', [
        ...validateUpdateRecipeParams,
        update
    ]
);


export default recipesRouter;