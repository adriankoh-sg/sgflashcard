import Image from 'next/image';
import { homePageContent } from '@constant/staticPagesContent';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="overflow-hidden py-32 px-2 flex justify-center items-center ">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute left-1/2 top-1/2 -z-10 mx-auto size-[800px] rounded-full border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
              {homePageContent.icon}
            </span>
            <h2 className="mx-auto max-w-screen-lg text-balance text-center text-3xl font-medium md:text-6xl">
              {homePageContent.heading}
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-muted-foreground md:text-lg">
              {homePageContent.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pb-12 pt-3">
              <Button size="lg" asChild>
                <Link href={'/auth'}>
                  {homePageContent.button.text} {homePageContent.button.icon}
                </Link>
              </Button>
              {homePageContent.trustText && (
                <div className="text-xs text-muted-foreground">
                  {homePageContent.trustText}
                </div>
              )}
            </div>
          </div>
          <div className="relative flex flex-col mx-auto h-full max-h-[524px] w-full max-w-screen-lg gap-4">
            <Image
              src={homePageContent.imageSrc}
              alt={homePageContent.imageAlt}
              width={500}
              height={500}
              className="mx-auto h-full max-h-[524px] w-full max-w-screen-lg rounded-2xl object-cover"
            />
            <div className="flex flex-row text-xs text-muted-foreground gap-2">
              {homePageContent.mail.icon}
              {homePageContent.mail.email}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
