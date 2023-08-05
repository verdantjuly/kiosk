import { Sequelize } from 'sequelize';
import Env from '../../env';
const env = new Env();

const development = env.database;
const test = env.testdatabase;
let database;

if (process.env.NODE_ENV === 'development') database = development;
else if (process.env.NODE_ENV === 'test') database = test;

const sequelize = new Sequelize({
  database: database,
  username: env.username,
  port: env.mysqlport,
  password: env.password,
  host: env.mysqlhost,
  dialect: env.dialect,
});

export default sequelize;
