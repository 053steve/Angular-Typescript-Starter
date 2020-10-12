import {Sequelize} from 'sequelize-typescript';
import config from '../config';

export const sequelize = new Sequelize({
    database: config.dbConfig.database,
    username: config.dbConfig.username,
    password: config.dbConfig.password,
    host: config.dbConfig.host,
    port: config.dbConfig.port,
    dialect: config.dbConfig.dialect,
    pool: config.dbConfig.pool,
    models: [__dirname + '/**/*.model.ts'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});


