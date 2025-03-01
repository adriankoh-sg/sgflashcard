import { URLS } from '@constant/appConfig';

export function AuthFooter() {
  return (
    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
      By clicking continue, you agree to our{' '}
      <a href={URLS.terms}>Terms of Service</a> and{' '}
      <a href={URLS.policy}>Privacy Policy</a>.
    </div>
  );
}
