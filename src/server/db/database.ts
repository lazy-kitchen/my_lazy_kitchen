const environment: string = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile');

if (!(environment in configuration)) {
    throw new Error(`Unknown environment: ${environment}`)
}

export const dbInfo = configuration[environment];

