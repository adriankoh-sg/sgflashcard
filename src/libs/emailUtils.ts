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

export const sendVerificationEmail = async (
  sendTo: string,
  verifyUrl: string
) => {
  const subject = `${APP_NAME} - Verify your email`;
  const text = `Copy this link and open it on a browser ${verifyUrl}`;
  const html = `Click the link to verify your email <a href='${verifyUrl}'>${verifyUrl}</a>`;
  await sendEmail({ sendTo, subject, html, text });
};
