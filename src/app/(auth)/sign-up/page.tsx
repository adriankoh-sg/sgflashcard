import { SignUpForm } from '../_components/signUpForm';
import FormWrapper from '../_components/formWrapper';
import { AuthFooter } from '../_components/footer';

export default function SignUpPage() {
  return (
    <FormWrapper
      title="Welcome to SG Flashcard"
      description="Fill in the following to sign up."
    >
      <SignUpForm />
      <AuthFooter isLoginPage={false} />
    </FormWrapper>
  );
}
