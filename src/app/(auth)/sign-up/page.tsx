import { SignUpForm } from '../_components/signUpForm';
import FormWrapper from '../_components/formWrapper';
import { AuthFooter } from '../_components/footer';
import { RolesType } from '@/db/model';
import { rolesEnum } from '@/db/schema';
import { notFound } from 'next/navigation';

const SignUpPage = async (props: {
  searchParams: Promise<{
    role: RolesType;
  }>;
}) => {
  const { role } = await props.searchParams;

  // If the params does not contain the roles in rolesEnum list, then redirect to notFound
  if (!rolesEnum.enumValues.includes(role)) notFound();

  return (
    <FormWrapper title={`Create a new ${role} account`} description="">
      <SignUpForm role={role} />
      <AuthFooter isLoginPage={false} />
    </FormWrapper>
  );
};

export default SignUpPage;
