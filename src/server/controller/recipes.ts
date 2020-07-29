import express from 'express';
import { handleHttpError } from '../utility/http';
import Recipe from '../db/models/recipe';

export const index = async (_req: express.Request, res: express.Response) => {
    try {
        const recipes: Array<Recipe> = await Recipe.query();
        res.status(200)
            .json({
                recipes: recipes
            });
    } catch(err)  {
        handleHttpError(res, err);
    }
};

export const show = async(req: express.Request, res: express.Response) => {
    try {
        const recipe: Recipe = await Recipe.query().findOne({
            slug: req.params.id
        }).withGraphFetched('steps');

        res.status(200)
            .json({
                recipe: recipe
            });
    } catch(err) {
        handleHttpError(res, err);
    }
};

export const create = async (req: express.Request, res: express.Response) => {
    try {
        const recipe = await Recipe.query().insert(req.body.recipe);
        res.status(201)
            .json({
                recipe: recipe
            })
    } catch (error) {
        req.app.get('logger').error(error);
        res.status(500)
            .json({
                errors: [error.message]
            });
    }
};

export const update = async(req: express.Request, res: express.Response) => {
    try {
        const recipe = await Recipe.query().updateAndFetchById(req.body.recipe.id, req.body.recipe);
        res.status(200)
            .json({
                recipe: recipe
            })
    } catch (error) {
        req.app.get('logger').error(error);
        res.status(500)
            .json({
                errors: [error.message]
            });
    }
};