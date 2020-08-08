import express from 'express';
import { handleHttpError } from "../utility/http";
import Ingredient from "../db/entity/ingredient";

export const index = async (req: express.Request, res: express.Response) => {
    try {
        const ingredients: Array<Ingredient> = [];
        if (ingredients.length) {
            res.status(200)
                .json({
                    ingredients: ingredients
                });
        } else {
            res.status(404).json({
               errors: [
                   {
                       message: 'No results found'
                   }
               ]
            });
        }
    } catch (error) {
        req.app.get('logger').error(error);
        handleHttpError(res, error)
    }
}