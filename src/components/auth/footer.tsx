import { POLICY, TERMS } from '@constant/routes';

export function AuthFooter() {
  return (
    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
      To continue, you agree to our <a href={TERMS}>Terms of Service</a> and{' '}
      <a href={POLICY}>Privacy Policy</a>.
    </div>
  );
}
