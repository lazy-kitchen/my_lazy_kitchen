import { createConnection } from "typeorm";
import { connectionSettings } from "./ormconfig";

export const connection = createConnection(connectionSettings);

export const manager = async () => {
    const conn = await connection;
    return conn.manager;
};
