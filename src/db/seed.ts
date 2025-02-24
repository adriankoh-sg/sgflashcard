import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

export const seed = async () => {
  console.log('+++ Hello I am here ++');
  const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'main',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD,
    {
      host: 'mysql_db', // docker container name
      port: 3306,
      dialect: 'mysql',
      dialectModule: mysql2,
      ssl: false,
    }
  );

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
