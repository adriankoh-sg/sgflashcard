import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { HOME_PAGE, SIGN_IN } from '@/constants/routes';
import { getUserDetailsByUid, userSetVerifyEmail } from '@/db/auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const user = await getUserDetailsByUid(uid);
  let success = false;

  if (!user || user?.length <= 0) notFound();
  else {
    const result = await userSetVerifyEmail(uid);
    success = result.success;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-start gap-2 bg-muted p-6 md:p-10">
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome {user && user[0]?.name}
            </CardTitle>
            <CardDescription>Your email is verified now!</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={SIGN_IN}
              className="text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary"
            >
              You may now go to LOGIN page
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome {user && user[0]?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <CardDescription>
              There is some problem on your account. Please try again later.
            </CardDescription>
            <Button variant="secondary" asChild>
              <Link
                href={HOME_PAGE}
                className="text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary"
              >
                Back to home.
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
