export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  return <div>uid: {uid}</div>;
}
