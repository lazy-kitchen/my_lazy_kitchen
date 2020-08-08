import path from 'path';

import { serverPort as port } from "../../browser/configuration";

// Configuration slices are defined by various individual variables, callbacks, and constants
// Code may import the specific chunks needed, as necessary.
// @note Using a more full-featured configuration package/solution may be a better option in the longer term.

export const logging = {
    logDirPath: path.join(__dirname, '..', 'logs')
};

export const serverPort = port;

export const appVersion = process.env.VERSION || '0.0.0';

export const corsOrigin = process.env.ORIGIN || '*'