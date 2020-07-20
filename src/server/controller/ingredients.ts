import express from 'express';
import { handleHttpError } from '../utility/http';
import Ingredient from '../db/models/ingredient';

export const index = async (_req: express.Request, res: express.Response) => {
    try {
        const ingredients: Array<Ingredient> = await Ingredient.query();
        res.status(200)
            .json({
                ingredients: ingredients
            });
    } catch(err)  {
        handleHttpError(res, err);
    }
};

export const show = async(req: express.Request, res: express.Response) => {
    try {
        const ingredient: Ingredient = await Ingredient.query().findById(req.params.id);

        res.status(200)
            .json({
                ingredient: ingredient
            });
    } catch(err) {
        handleHttpError(res, err);
    }
};

export const create = async (req: express.Request, res: express.Response) => {
    try {
        const ingredient = await Ingredient.query().insert(req.body.ingredient);
        res.status(201)
            .json({
                ingredient: ingredient
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
        const ingredient = await Ingredient.query().updateAndFetchById(req.body.ingredient.id, req.body.ingredient);
        res.status(200)
            .json({
                ingredient: ingredient
            })
    } catch (error) {
        req.app.get('logger').error(error);
        res.status(500)
            .json({
                errors: [error.message]
            });
    }
};