'use server';
import { SignInFormSchema, SignUpFormSchema } from './rules';
import { sendVerificationEmail } from '@/lib/emailUtils';
import { BASE_URL, VERIFY_EMAIL } from '@/constants/routes';
import { createUser } from '@/db/auth';

interface IReturnType {
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    name?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  };
  name?: string;
  email?: string;
  success?: boolean;
  errorMsg?: string;
}

export const signUpWithEmailPassword = async (
  state,
  formData: FormData
): Promise<IReturnType | undefined> => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validatedFields = SignUpFormSchema.safeParse({
    name,
    email,
    password,
    confirmPassword: formData.get('confirmPassword') as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      name,
      email,
    };
  }

  try {
    const result = await createUser({
      name,
      email,
      password,
      role: 'admin',
    });

    if (result.success) {
      const verificationUrl = `${BASE_URL}${VERIFY_EMAIL.replace(
        '{{uid}}',
        result?.uid || ''
      )}`;

      await sendVerificationEmail(email, verificationUrl);

      return { success: true, email, name };
    }
    // createUser with error
    console.error(`[signUpWithEmailPassword] - ${result.errorMsg}`);
    return { success: false, errorMsg: 'Email account is already in used' };
  } catch (error) {
    const errorMsg = (error as Error).message;
    console.error(`[signUpWithEmailPassword] - ${errorMsg}`);

    return { success: false, errorMsg };
  }
};

export async function signInAction(
  state,
  formData: FormData
): Promise<IReturnType | undefined> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validatedFields = SignInFormSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email,
    };
  }

  try {
    console.log('Login');
  } catch (error) {
    const errorCode = (error as Error).message;

    console.log('From firebase: ', errorCode);
  }
}
