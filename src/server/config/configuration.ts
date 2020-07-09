import path from "path";

// Configuration slices are defined by various individual variables, callbacks, and constants
// Code may import the specific chunks needed, as necessary.
// @note Using a more full-featured configuration package/solution may be a better option in the longer term.

export const logging = {
    logDirPath: path.join(__dirname, '..', 'logs')
};

export const serverPort = 8000;