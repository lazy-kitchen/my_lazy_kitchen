import { HTTPError } from "../utility/error";
import express from "express";

/**
 * Set a handler for any unmatched routes. Set it at the end, below any other declared routes, to ensure that it does not
 * overwrite any defined routes.
 * If the request route is not handled by a registered router/route-handler, then it is caught by this middleware.
 * If the route was not matched, then by definition it should be a 404 error, and so should be handled in that way.
 *
 * @param {express.Request} req Reference to current incoming HTTP request
 * @param {express.Response} res Reference to the HTTP response that will be sent form the server
 * @param {express.NextFunction} next Function that when executed will execute the next middleware, succeeding the current middleware
 */
export const NotFoundHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err = new HTTPError('Not Found');
    err.status = 404;
    next(err);
};

/**
 * Handle any errors raised during the request/response cycle and respond with the rror response
 *
 * @param {HTTPError} err Error raised during the course of the request/response cycle
 * @param {express.Request} req Reference to current incoming HTTP request
 * @param {express.Response} res Reference to the HTTP response that will be sent form the server
 * @param {express.NextFunction} _next Function that when executed will execute the next middleware, succeeding the current middleware
 */
export const HTTPErrorHandler = (err: HTTPError, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    // set locals, only providing error locals in development
    res.locals.message = err.message;
    // Only send the error information in development where it may be helpful for debugging.
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500)
        .json({message: res.locals.message})
};
