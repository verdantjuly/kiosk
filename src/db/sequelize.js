import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const env = process.env;

const sequelize = new Sequelize({
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
});

export default sequelize;
