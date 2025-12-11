import { DataSource } from "typeorm";
import { GameEntity } from "../models/GameEntity";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "secret",
    database: process.env.DB_NAME || "hangman_db",
    synchronize: true,
    logging: false,
    entities: [GameEntity],
    subscribers: [],
    migrations: [],
});