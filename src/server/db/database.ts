import Knex from 'knex';
import { Model } from 'objection';

const environment: string = process.env.NODE_ENV || 'development';
import configuration from './knexfile';

if (!(environment in configuration)) {
    throw new Error(`Unknown environment: ${environment}`)
}
// @ts-ignore
export const dbInfo = configuration[environment];

