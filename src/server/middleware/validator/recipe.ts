import {check, validationResult } from 'express-validator';
import express from 'express';

export const validateNewRecipeParams = [
    check('recipe.name').exists().withMessage('Recipe must exist')
        .trim()
        .not().isEmpty().withMessage('Recipe must not be empty')
        .escape()
        .isLength({ max: 1000 }).withMessage('Recipe must be no longer than 1000 characters'),
    check('recipe.description')
        .trim()
        .escape()
        .isLength({ max: 2000}).withMessage('Recipe must be no longer than 2000 characters'),
    check('recipe.completionTime').exists().withMessage('Recipe must exist')
        .escape()
        .isNumeric().withMessage('Recipe must be a valid number'),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        next();
    }
];

export const validateUpdateRecipeParams = [
    check('recipe.id').exists().withMessage('Recipe not found')
        .trim()
        .not().isEmpty().withMessage('Recipe not found')
        .escape(),
    check('recipe.name').exists().withMessage('Recipe must exist')
        .trim()
        .not().isEmpty().withMessage('Recipe must not be empty')
        .escape()
        .isLength({ max: 1000 }).withMessage('Recipe must be no longer than 1000 characters'),
    check('recipe.description')
        .trim()
        .escape()
        .isLength({ max: 2000}).withMessage('Recipe must be no longer than 2000 characters'),
    check('recipe.completionTime').exists().withMessage('Recipe must exist')
        .escape()
        .isNumeric().withMessage('Recipe must be a valid number'),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        next();
    }
]