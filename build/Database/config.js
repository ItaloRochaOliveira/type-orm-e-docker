"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    dev: {
        username: process.env.DB_USER,
        password: process.env.DB_USER_PASS,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
};
const env = process.env.NODE_ENV || 'dev';
const dbConfig = config[env];
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: dbConfig.host,
    port: 3306,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: true,
    entities: ['src/Entity/*.ts'],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=config.js.map