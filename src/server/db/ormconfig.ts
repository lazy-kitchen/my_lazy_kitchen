import path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

process.env.SRC_PATH = process.env.SRC_PATH || '';
if (!process.env.SRC_PATH) {
   throw new Error('Required SRC_PATH was not defined.')
}

const config = {
   "type": "postgres",
   "username": process.env.DB_USER,
   "password": process.env.DB_PASSWORD,
   "host": process.env.DB_HOST,
   "port": parseInt(process.env.DB_PORT || ''),
   "database": process.env.DB_NAME,
   "url": process.env.DATABASE_URL,
   "synchronize": process.env.DB_SYNCHRONIZE || false,
   "logging": (process.env.DB_LOGGING || false) ? "all" : false,
   "entities": [
      `${process.env.SRC_PATH}/server/db/entity/**/*.ts`
   ],
   "migrations": [
      `${process.env.SRC_PATH}/server/db/migration/**/*.ts`
   ],
   "subscribers": [
      `${process.env.SRC_PATH}/server/db/subscriber/**/*.ts`
   ],
   "cli": {
      "entitiesDir": path.join(process.env.SRC_PATH, 'server', 'db', 'entity'),
      "migrationsDir": path.join(process.env.SRC_PATH, 'server', 'db', 'migration'),
      "subscribersDir": path.join(process.env.SRC_PATH, 'server', 'db', 'subscriber')
   }
}

export const connectionSettings: PostgresConnectionOptions = {
   type: 'postgres',
   username: config.username,
   password: config.password,
   host: config.host,
   port: config.port,
   database: config.database,
   url: config.url,
   entities: config.entities,
   migrations: config.migrations,
   subscribers: config.subscribers
}

export default config;