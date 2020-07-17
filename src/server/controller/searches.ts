import express from 'express';
import Ingredient from "@/server/db/models/ingredient";
import {handleHttpError} from "@/server/utility/http";

export const index = async (_req: express.Request, res: express.Response) => {
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
        console.error(error);
        handleHttpError(res, error)
    }
}