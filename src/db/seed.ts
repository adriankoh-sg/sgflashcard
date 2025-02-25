'use server';
import { Sequelize } from 'sequelize';
import { dbConfig } from '@db/dbConfig';

export const seed = async () => {
  console.log('+++ Hello I am here ++');
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: 'mariadb',
    }
  );

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
