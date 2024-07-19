import { Consulta } from "../Entity/Consulta";
import { Users } from "../Entity/Users";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

interface IDConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
}

interface IConfig {
    dev :IDConfig;
    homolog: IDConfig;
}

const config: IConfig = {
    dev: {
        username: process.env.DB_USER!,
        password: process.env.DB_USER_PASS!,
        database: process.env.DB_DATABASE!,
        host: process.env.DB_HOST!,
        dialect: 'mysql'
    },
    homolog: {
        username: process.env.DB_USER!,
        password: process.env.DB_USER_PASS!,
        database: process.env.DB_DATABASE!,
        host: process.env.DB_HOST!,
        dialect: 'mysql'
    }
}

const env = process.env.NODE_ENV_HOMOLOG || 'dev';
const dbConfig = config[env as keyof typeof config];

export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbConfig.host,
    port: 3306,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: true,
    entities: ['src/Entity/*.ts', 'build/Entity/*.js'],
    subscribers: [],
    migrations: [],
});

