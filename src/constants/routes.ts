export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
export const HOME_PAGE = '/';
export const SIGN_IN = '/sign-in';
export const SIGN_UP = {
  STUDENT: '/sign-up/?role=student',
  TUTOR: '/sign-up/?role=tutor',
  ADMIN: 'sign-up/?role=admin',
};
export const FORGOT_PASSWORD = '/forgot-password';
export const VERIFY_EMAIL = '/verify-email/{{uid}}';
export const TERMS = '/terms';
export const POLICY = '/policy';
