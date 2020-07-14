import express from 'express';
import {handleHttpError} from '../utility/http';
import {Ingredient} from '../db/models';

export const index = async (_req: express.Request, res: express.Response) => {
    const dataPromise = new Promise((resolve, _reject) => {
        const ingredients: Array<Ingredient> = [
            {
                id: 1,
                name: 'Chocolate',
                description: 'Tasty!'
            },
            {
                id: 2,
                name: 'Vanilla',
                description: 'Delicious!'
            },
            {
                id: 3,
                name: 'Strawberry',
                description: 'Wonderful!'
            }
        ];
        return resolve(
            ingredients
        );
    });

    return await dataPromise
        .then((results) => {
            res.status(200)
                .json({
                    ingredients: results
                });
        })
        .catch((err) => {
            handleHttpError(res, err);
        })
};

export const show = async(req: express.Request, res: express.Response) => {
    const dataPromise = new Promise((resolve, _reject) => {
        const ingredients: Array<Ingredient> = [
            {
                id: 1,
                name: 'Chocolate',
                description: 'Tasty!'
            },
            {
                id: 2,
                name: 'Vanilla',
                description: 'Delicious!'
            },
            {
                id: 3,
                name: 'Strawberry',
                description: 'Wonderful!'
            }
        ];

        const ingredientId: number = parseInt(req.params.id);

        const currentIngredient: Ingredient | undefined = ingredients[ingredientId - 1]

        return resolve(
            currentIngredient
        );
    });

    return await dataPromise
        .then((results) => {
            res.status(200)
                .json({
                    ingredient: results
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
        ingredient: req.body.ingredient
    });
};

export const update = async(req: express.Request, res: express.Response) => {
    console.log(req.body);
    res.send({
        ingredient: req.body.ingredient
    });};