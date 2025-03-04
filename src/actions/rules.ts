import { z } from 'zod';

export const SignUpFormSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .regex(/[a-zA-Z]/, {
        message: 'Password must contain at least one letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .trim(),
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters' })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
      return { confirmPassword: 'Passwords do not match' };
    }
  });

export const SignInFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});
