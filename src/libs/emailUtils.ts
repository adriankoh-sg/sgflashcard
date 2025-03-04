'use server';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { APP_NAME, CONTACT_US } from '@/constant/appConfig';

const options = {
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(options);

export const sendEmail = async ({
  sendTo,
  subject,
  html = '',
  text = '',
}: {
  sendTo: string;
  subject: string;
  html?: string;
  text?: string;
}) => {
  console.log({ options });
  try {
    await transporter.sendMail({
      from: CONTACT_US.EMAIL,
      to: sendTo,
      subject,
      html,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('mail error', error);
  }
};

const verifyEmailBody = (email: string, verifyLink: string) => {
  return {
    html: `
      Welcome to ${APP_NAME}!<br />
      <br />Please click the link to verify your email: <b>${email}</b> and activate your account:<br />
      <br />
      <a href='${verifyLink}'>Verify Email</a>
      <br />
      <hr />
      <br />Yours sincerely,<br/>
      <br />
      ${APP_NAME} support
      <br />
      < This is an auto-generated email, do not reply >
      `,
    text: `
      Welcome to ${APP_NAME}!\n
      Please copy the link and open it in new browser:\n
      \n${verifyLink}\n
      \n
      \nYours sincerely,
      \n${APP_NAME} support
      \n< This is an auto-generated email, do not reply >
      `,
  };
};

export const sendVerificationEmail = async (
  sendTo: string,
  verifyUrl: string
) => {
  const subject = `${APP_NAME} - Verify your email address`;
  const content = verifyEmailBody(sendTo, verifyUrl);
  await sendEmail({ sendTo, subject, html: content.html, text: content.text });
};
