'use server';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
    ssl: true,
  },
});

export const seed = async () => {
  console.log('+++ Hello I am here ++');
};
