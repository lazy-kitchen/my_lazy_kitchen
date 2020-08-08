import express from 'express';
import { handleHttpError } from '../utility/http';
import Recipe from '../db/entity/recipe';
import { connection } from "../db/database";
import Step from "../db/entity/step";

export const index = async (_req: express.Request, res: express.Response) => {
    try {
        const recipes: Array<Recipe> = await Recipe.Repo().createQueryBuilder()
            .getMany();

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
        const recipe = await Recipe.Repo().findOne({
            slug: req.params.id,
        });

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
        const recipe = await Recipe.Repo().create(
            req.body.recipe as Recipe
        );
        await Recipe.Repo().save(recipe);

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
        const recipe = await Recipe.Repo().create(
            req.body.recipe as Recipe
        );

        const dbConnectedSteps: StepsPayload = {
            createdSteps: req.body.steps.createdSteps,
            updatedSteps: req.body.steps.updatedSteps,
            removedSteps: req.body.steps.removedSteps
        };

        await Recipe.updateAll(
            recipe,
            dbConnectedSteps
        );

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

export interface StepsPayload {
    createdSteps?: Array<Step>;
    updatedSteps?: Array<Step>;
    removedSteps?: Array<Step >;
}