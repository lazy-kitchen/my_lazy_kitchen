// Update with your config settings.
// @note Run with -x ts to support TypeScript in migration files
// @note Run with --esm to support module imports/exports in migration files

// TODO Due to historical lack of full support for BigInt in JS, the solution has involved dealing with these values as strings
//  However, assumptions are made that the values being passed around should be numbers. Therefore, the string values that
//  are parsed out of the db response, need to be converted to a numeric value, by altering the behavior of their type parsers.
//  While unfortunately this will cause a lack of precision for large numbers/decimals, as the numbers are converted to something
//  that is understood by the parse functions, at the moment, since these numbers are unlikely to be reached any time soon,
//  it was decided to use the parsers.
//  When FULL support for bigint/numeric in all relevant language, driver, and ORM libraries is available, these parsers will not
//  be needed, and so should be removed.
const pg = require('pg');
// bigint
pg.types.setTypeParser(20, (value: string) => {
  return parseInt(value);
});
// float
pg.types.setTypeParser(1700, (value: string) => {
  return parseFloat(value);
});

import { resolve } from 'path';

module.exports = {
  migrations: {
    directory: resolve(__dirname, 'migrations')
  },
  seeds: {
    directory: resolve(__dirname, 'seeds')
  },
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      database: 'my_lazy_kitchen_dev',
      user: 'hatsumei',
      password: 'hatsu_local',
      host: 'localhost',
      port: 5433
    },
    debug: true,
    migrations: {
      directory: resolve(__dirname, 'migrations')
    },
    seeds: {
      directory: resolve(__dirname, 'seeds')
    },
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: process.env.DATABASE_URL || {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};