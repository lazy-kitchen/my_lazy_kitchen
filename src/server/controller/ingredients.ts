import express from 'express';
import {handleHttpError} from "../utility/http";
import {Ingredient} from "../db/models";

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

export const show = async(_req: express.Request, res: express.Response) => {
    const dataPromise = new Promise((resolve, _reject) => {
        const ingredient: Ingredient = {
            id: 1,
            name: 'Chocolate',
            description: 'Tasty!'
        };
        return resolve(ingredient)
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