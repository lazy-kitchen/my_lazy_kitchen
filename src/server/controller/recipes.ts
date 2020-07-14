import express from 'express';
import {handleHttpError} from '../utility/http';
import {Recipe} from '../db/models';

export const index = async (_req: express.Request, res: express.Response) => {
    const dataPromise = new Promise((resolve, _reject) => {
        const recipes: Array<Recipe> = [
            {
                id: 1,
                name: 'Cake',
                description: 'Tasty!',
                completionTime: 1
            },
            {
                id: 2,
                name: 'Cookie',
                description: 'Delicious!',
                completionTime: 2
            },
            {
                id: 3,
                name: 'Muffin',
                description: 'Wonderful!',
                completionTime: 3
            }
        ];
        return resolve(
            recipes
        );
    });

    return await dataPromise
        .then((results) => {
            res.status(200)
                .json({
                    recipes: results
                });
        })
        .catch((err) => {
            handleHttpError(res, err);
        })
};

export const show = async(req: express.Request, res: express.Response) => {
    const dataPromise = new Promise((resolve, _reject) => {
        const recipes: Array<Recipe> = [
            {
                id: 1,
                name: 'Cake',
                description: 'Tasty!',
                completionTime: 1
            },
            {
                id: 2,
                name: 'Cookie',
                description: 'Delicious!',
                completionTime: 2
            },
            {
                id: 3,
                name: 'Muffin',
                description: 'Wonderful!',
                completionTime: 3
            }
        ];

        const recipeId: number = parseInt(req.params.id);

        const currentRecipe: Recipe | undefined = recipes[recipeId - 1]

        return resolve(
            currentRecipe
        );
    });

    return await dataPromise
        .then((results) => {
            res.status(200)
                .json({
                    recipe: results
                });
        })
        .catch((err) => {
            handleHttpError(res, err);
        })
};

export const create = async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    res.status(201);
    res.send({
        recipe: req.body.recipe
    });
};

export const update = async(req: express.Request, res: express.Response) => {
    console.log(req.body);
    res.send({
        recipe: req.body.recipe
    });};