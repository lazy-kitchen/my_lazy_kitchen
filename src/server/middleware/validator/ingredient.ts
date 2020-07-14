import {check, validationResult } from 'express-validator';
import express from 'express';

export const validateNewIngredientParams = [
    check('ingredient.name').exists().withMessage('Name must exist')
        .trim()
        .not().isEmpty().withMessage('Name must not be empty')
        .escape()
        .isLength({ max: 1000 }).withMessage('Name must be no longer than 1000 characters'),
    check('ingredient.description')
        .trim()
        .escape()
        .isLength({ max: 2000}).withMessage('Description must be no longer than 2000 characters'),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        next();
    }
];

export const validateUpdateIngredientParams = [
    check('ingredient.id').exists().withMessage('Ingredient not found')
        .trim()
        .not().isEmpty().withMessage('Ingredient not found')
        .escape(),
    check('ingredient.name').exists().withMessage('Name must exist')
        .trim()
        .not().isEmpty().withMessage('Name must not be empty')
        .escape()
        .isLength({ max: 1000 }).withMessage('Name must be no longer than 1000 characters'),
    check('ingredient.description')
        .trim()
        .escape()
        .isLength({ max: 2000}).withMessage('Description must be no longer than 2000 characters'),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        next();
    }
]