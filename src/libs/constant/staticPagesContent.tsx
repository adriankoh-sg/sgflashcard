import { BookOpen, Mail, Zap } from 'lucide-react';
import { appConfig } from '@constant/appConfig';
import Link from 'next/link';

export const homePageContent = {
  icon: <BookOpen className="size-6" />,
  heading: 'Learning Chinese with Flash cards',
  description: 'A platform for learning Chinese using flash card.',
  button: {
    text: 'Discover Features',
    icon: <Zap className="ml-2 size-4" />,
    url: 'https://www.shadcnblocks.com',
  },
  trustText: 'Use by tutors and students around Singapore',
  imageSrc: 'https://shadcnblocks.com/images/block/placeholder-1.svg',
  imageAlt: 'placeholder',
  mail: {
    icon: <Mail className="size-4" />,
    email: <Link href={`mailto:${appConfig.email}`}>{appConfig.email}</Link>,
  },
};
