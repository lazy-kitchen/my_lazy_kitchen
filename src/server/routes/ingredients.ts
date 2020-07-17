import express from 'express';
import cors from 'cors';

import { index, show, create, update } from '../controller/ingredients'
import { validateNewIngredientParams, validateUpdateIngredientParams } from "../middleware/validator/ingredient";
import { corsOrigin } from '../config/configuration';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', index);
ingredientsRouter.get('/:id', show);

ingredientsRouter.options('/', cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200
}));
ingredientsRouter.post(
    '/',
    [
        ...validateNewIngredientParams,
        create
    ]
);

ingredientsRouter.options('/:id', cors({
    origin: corsOrigin,
    optionsSuccessStatus: 200
}));
ingredientsRouter.patch(
    '/:id',
    [
        ...validateUpdateIngredientParams,
        update
    ]
);

export default ingredientsRouter;