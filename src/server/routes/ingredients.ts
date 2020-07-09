import express from "express";

import { index, show } from '../controller/ingredients'

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', index);
ingredientsRouter.get('/:id', show);

// ingredientsRouter.get('/ingredients/new');
// ingredientsRouter.post('/ingredients');
//
// ingredientsRouter.get('/ingredients/edit');
// ingredientsRouter.patch('/ingredients/:id');


export default ingredientsRouter;