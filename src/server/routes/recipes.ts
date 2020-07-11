import express from "express";

import { index, show, create, update } from '../controller/recipes'

const recipesRouter = express.Router();

recipesRouter.get('/', index);
recipesRouter.get('/:id', show);

// recipesRouter.get('/recipes/new');
recipesRouter.post('/', create);
//
// recipesRouter.get('/recipes/edit');
recipesRouter.patch('/:id', update);


export default recipesRouter;