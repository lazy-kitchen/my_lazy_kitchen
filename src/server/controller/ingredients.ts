import express from 'express';
import { handleHttpError } from '../utility/http';
import Ingredient from '../db/entity/ingredient';


export const index = async (_req: express.Request, res: express.Response) => {
    try {
        const ingredients: Array<Ingredient> = await Ingredient.Repo().createQueryBuilder()
            .getMany();

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
        const ingredient = await Ingredient.Repo().findOne({
            slug: req.params.id
        });

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
        const ingredient = await Ingredient.Repo().create(
            req.body.ingredient as Ingredient
        );
        await Ingredient.Repo().save(ingredient);

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
        const ingredient = await Ingredient.Repo().create(
            req.body.ingredient as Ingredient
        );
        await Ingredient.Repo().update(
            ingredient.id,
            ingredient
        );

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