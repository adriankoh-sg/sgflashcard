'use client';
import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpWithEmailPassword } from '@/actions/auth';
import Form from 'next/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function SignUpForm({
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [state, signUpAction, isPending] = useActionState(
    signUpWithEmailPassword,
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success('Account created successfully', {
        description: `A verification link has been sent to your email ${state?.email}.`,
      });
      router.push('/');
    } else {
      if (state?.errorMsg)
        toast.error('An error has occured', {
          description: state?.errorMsg,
        });
    }
    console.log({ state });
  }, [router, state]);

  return (
    <div className={'flex flex-col gap-6'} {...props}>
      <Form action={signUpAction} disabled={isPending}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                name="name"
                type="name"
                placeholder="you full name"
                defaultValue={state?.name}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                defaultValue={state?.email}
                required
              />
              <div className="error">
                {state?.errors?.email && <p>{state.errors.email}</p>}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="password"
                required
              />
              {state?.errors?.password && (
                <div className="error text-sm text-red-500">
                  <ul className="list-disc list-inside ml-2">
                    {state.errors?.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="confirm password"
                required
              />
              {state?.errors?.confirmPassword && (
                <div className="error text-sm text-red-500">
                  <p>{state.errors?.confirmPassword}</p>
                </div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
