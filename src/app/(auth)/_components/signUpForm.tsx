'use client';
import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpWithEmailPassword } from '@/actions/auth';
import Form from 'next/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { RolesType } from '@/db/model';

export function SignUpForm({ role }: { role?: RolesType }) {
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
  }, [router, state]);

  return (
    <div className={'flex flex-col gap-6'}>
      <Form action={signUpAction} disabled={isPending}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
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
                id="email"
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
                id="password"
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
                id="confirmPassword"
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
            <div className="flex items-center space-x-2">
              <Separator orientation="horizontal" />
            </div>
            <Input id="role" name="role" type="hidden" value={role} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
