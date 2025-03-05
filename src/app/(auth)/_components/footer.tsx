import { POLICY, SIGN_UP, TERMS } from '@/constants/routes';
import Link from 'next/link';

export function AuthFooter({ isLoginPage = true }: { isLoginPage?: boolean }) {
  return (
    <div className="flex flex-col w-full gap-2 py-2">
      {isLoginPage && (
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href={SIGN_UP} className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      )}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        To continue, you agree to our <Link href={TERMS}>Terms of Service</Link>{' '}
        and <Link href={POLICY}>Privacy Policy</Link>.
      </div>
    </div>
  );
}
