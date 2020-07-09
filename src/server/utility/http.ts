import express from 'express';

/**
 * Normalize port value for server to listen on to something understandable by `http`
 *
 * @param {any} portVal Value of port for HTTP server to listen on
 * @return {void|number|boolean}
 */
import {HTTPError} from "../utility/error";

export const normalizedPort = (portVal: any) => {
  const port = parseInt(portVal, 10);
  if (isNaN(port)) {
      // named pipe
      return;
  }

  if (port >= 0) {
      // port number
      return port;
  }

  return false;
};

export const handleHttpError = (res: express.Response, error: HTTPError) => {
    const errorMessage = `${error.status}: ${error.message}`;
    const logMessage = `${error.status} - ${errorMessage}`;
    const status = error.status >= 400 ? error.status : 500;
    console.error(logMessage);
    res.status(status).json({message: errorMessage});
};