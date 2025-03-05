'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signInAction } from '@/actions/auth';
import { useActionState, useEffect } from 'react';
import { ALLOW_GOOGLE_OAUTH } from '@/constants/appConfig';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [state, signIn, isPending] = useActionState(signInAction, undefined);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form action={signIn}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
          {/* TODO: Add google account login in the future */}
          {ALLOW_GOOGLE_OAUTH && (
            <div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
