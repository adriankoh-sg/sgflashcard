import { usersTable } from '../schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import 'dotenv/config';
import { RolesType } from '../model';

const db = drizzle({
  connection: process.env.DATABASE_URL as string,
  casing: 'snake_case',
});

export const hashPassword = (password: string, salt: string) =>
  crypto.hash('sha256', `${password}${salt}`).normalize();

export const findEmail = async (email: string) => {
  try {
    const result = await db.$count(usersTable, eq(usersTable.email, email));

    return result;
  } catch (error) {
    console.error('[findEmail]', error);
    return -1;
  }
};

interface ICreateUserRespone {
  success: boolean;
  uid?: string;
  name?: string;
  email?: string;
  errorMsg?: string;
}

export const createUser = async ({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: RolesType;
}): Promise<ICreateUserRespone> => {
  const salt = crypto.randomBytes(16).toString('hex').normalize();
  const encrpytPassword = hashPassword(password, salt);
  const uid = crypto.randomUUID();

  try {
    await db.insert(usersTable).values({
      uid,
      name,
      email,
      password: encrpytPassword,
      salt,
      avatar: '',
      role,
    });

    return {
      success: true,
      uid,
      name,
      email,
    };
  } catch (error) {
    const errorMsg = (error as Error).message;

    return {
      success: false,
      errorMsg,
    };
  }
};

export const userSetVerifyEmail = async (uid: string) => {
  const result = await db
    .update(usersTable)
    .set({ isEmailVerified: true })
    .where(eq(usersTable.uid, uid));

  return result.rows ? { success: true } : { success: false };
};

export const getUserDetailsByUid = async (uid: string) => {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.uid, uid));

  if (result.length > 0) {
    return result.flat();
  }
};
