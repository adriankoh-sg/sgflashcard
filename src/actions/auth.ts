'use server';
import { AuthErrorCodes, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '@/libs/firebase';
import { SignUpFormSchema } from './rules';
import { FirebaseError } from 'firebase/app';

interface IReturnType {
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    displayName?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  };
  displayName?: string;
  email?: string;
  firebaseError?: string;
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
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      formData.get('password') as string
    );

    // Signed up
    const {
      user: { uid },
      providerId,
      operationType,
    } = userCredential;
    console.log({
      uid,
      providerId,
      operationType,
    });
  } catch (error) {
    const errorCode = (error as FirebaseError).code;

    if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
      console.error({ errorCode });
      return {
        firebaseError:
          'The email address is already in use by another account.',
      };
    }

    return {
      firebaseError: 'An error occurred while signing up.',
    };
  }
}
