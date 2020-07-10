import express from "express";

import { index, show, create, update } from '../controller/ingredients'

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', index);
ingredientsRouter.get('/:id', show);

// ingredientsRouter.get('/ingredients/new');
ingredientsRouter.post('/', create);
//
// ingredientsRouter.get('/ingredients/edit');
ingredientsRouter.patch('/:id', update);


export default ingredientsRouter;