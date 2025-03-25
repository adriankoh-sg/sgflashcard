import { Toaster } from '@/components/ui/sonner';
import { APP_DESCRIPTION, APP_NAME } from '@/constants/appConfig';
import { BASE_URL } from '@/constants/routes';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';

const albertSans = Albert_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn([albertSans.className, 'antialiased'])}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
