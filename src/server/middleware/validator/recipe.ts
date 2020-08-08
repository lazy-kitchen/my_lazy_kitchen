import {check, validationResult } from 'express-validator';
import express from 'express';

export const validateNewRecipeParams = [
    check('recipe.name').exists().withMessage('Recipe must exist')
        .trim()
        .not().isEmpty().withMessage('Recipe must not be empty')
        .isLength({ max: 1000 }).withMessage('Recipe must be no longer than 1000 characters'),
    check('recipe.description')
        .trim()
        .isLength({ max: 2000}).withMessage('Recipe must be no longer than 2000 characters'),
    check('recipe.completionTime').exists().withMessage('Recipe must exist')
        .toFloat(),
    check('recipe.steps.*.id')
        .toInt(),
    check('recipe.steps.*.step_number')
        .toInt(),
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
        .toInt()
        .not().isEmpty().withMessage('Recipe not found'),
    check('recipe.name').exists().withMessage('Name must exist')
        .trim()
        .not().isEmpty().withMessage('Name must not be empty')
        .isLength({ max: 1000 }).withMessage('Name must be no longer than 1000 characters'),
    check('recipe.description')
        .trim()
        .isLength({ max: 2000}).withMessage('Description must be no longer than 2000 characters'),
    check('recipe.completionTime').exists().withMessage('Recipe must have a completion time')
        .toFloat(),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        next();
    }
]