import { LoginForm } from '@/app/(auth)/_components/loginForm';
import FormWrapper from '@/app/(auth)/_components/formWrapper'
import { AuthFooter } from '@/app/(auth)/_components/footer';

export default function LoginPage() {
  return (
    <FormWrapper
      title="Welcome to SG Flashcard"
      description="Login to access our system"
    >
      <LoginForm />
      <AuthFooter />
    </FormWrapper>
  );
}
