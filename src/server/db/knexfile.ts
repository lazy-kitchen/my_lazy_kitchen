// Update with your config settings.
// @note Run with -x ts to support TypeScript in migration files
// @note Run with --esm to support module imports/exports in migration files
export default {
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
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
    debug: true
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