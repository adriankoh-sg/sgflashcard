'use client';
import { useActionState, useEffect } from 'react';
import { cn } from '@libs/utils';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { signUpWithEmailPassword } from '@actions/auth';
import Form from 'next/form';
import { toast } from 'sonner';
import { AuthFooter } from './footer';

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [state, signUpAction, isPending] = useActionState(
    signUpWithEmailPassword,
    undefined
  );

  console.log({ state, signUpAction, isPending });
  useEffect(() => {
    if (state?.firebaseError) {
      toast('An error has occurred', {
        description: state.firebaseError,
      });
    }
  }, [state]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={signUpAction}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="displayName">Display name</Label>
                  <Input
                    name="displayName"
                    type="name"
                    placeholder="display name"
                    defaultValue={state?.displayName}
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
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      <AuthFooter />
    </div>
  );
}
