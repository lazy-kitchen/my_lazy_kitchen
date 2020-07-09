import express from "express";

import { appVersion } from "../config/configuration";
import ingredientsRouter from "../routes/ingredients";

const router = express.Router();

// Namespaced/specific functionality routes
router.use('/api/ingredients', ingredientsRouter);

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