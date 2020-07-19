import express from 'express';

import { appVersion } from '../config/configuration';
import ingredientsRouter from '../routes/ingredients';
import recipesRouter from '../routes/recipes';
import searchRouter from "../routes/search";

const router = express.Router();

// Namespaced/specific functionality routes
router.use('/api/recipes', recipesRouter);
router.use('/api/ingredients', ingredientsRouter);
router.use('/api/search', searchRouter);

// Top-level/basic Routes

// redirect any requests to root, to the support /api namespace
router.get('/', (req, res, _next) => {
   res.redirect(301, '/api');
});

router.get('/api/ping', (req, res, _next) => {
    res.json({
       version: appVersion,
       message: 'PONG'
    });
});

export default router;