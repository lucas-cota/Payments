import {Sequelize} from 'sequelize';

const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST


// Option 1: Passing parameters separately
const sequelize = new Sequelize(database, username, 'root', {
  host: dbHost,
  dialect: 'postgres'
});

export default sequelize