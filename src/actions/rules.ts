import { z } from 'zod';

export const SignUpFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .nonempty()
      .trim(),
    email: z.string().email('Invalid email address').nonempty().trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[a-zA-Z]/, {
        message: 'Password must contain at least one letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .trim(),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters')
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SignInFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' })
    .trim(),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .trim(),
});
