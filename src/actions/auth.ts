'use server';
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseAuth } from '@/libs/firebase';
import { SignInFormSchema, SignUpFormSchema } from './rules';
import { FirebaseError } from 'firebase/app';
import { sendVerificationEmail } from '@/libs/emailUtils';
import { BASE_URL, VERIFY_EMAIL } from '@/constant/routes';

interface IReturnType {
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    displayName?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  };
  displayName?: string;
  email?: string;
  success?: boolean;
  verificationFail?: string;
}

export async function signUpWithEmailPassword(
  state,
  formData: FormData
): Promise<IReturnType | undefined> {
  const displayName = formData.get('displayName') as string;
  const email = formData.get('email') as string;

  const validatedFields = SignUpFormSchema.safeParse({
    displayName,
    email,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      displayName,
      email,
    };
  }

  try {
    const verificationUrl = `${BASE_URL}${VERIFY_EMAIL.replace(
      '{{uid}}',
      '1'
    )}`;
    await sendVerificationEmail(email, verificationUrl);
  } catch (error) {
    console.error({ error });
    return {
      verificationFail: 'Sent email verification failed.',
    };
  }
}

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
    const result = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    console.log('From Firebase:', result);
  } catch (error) {
    const errorCode = (error as FirebaseError).code;

    console.log('From firebase: ', errorCode, error);
  }
}
