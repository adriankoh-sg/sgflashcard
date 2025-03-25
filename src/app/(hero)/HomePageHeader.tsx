import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import Link from 'next/link';

const HomePageHeader = () => {
  return (
    <nav className="flex flex-row justify-center bg-background sticky top-0 z-10 w-full p-2">
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="md:col-span-1 justify-start pl-6">
          <Link href="/">
            <Image
              src={'/images/sgflashcard-logo.png'}
              width={200}
              height={40}
              alt=""
            />
          </Link>
        </div>
        <div className="md:col-span-2 justify-start">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
                <Link href="/about-us">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About us
                  </NavigationMenuLink>
                </Link>
                <Link href="/testimonies">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Testimonies
                  </NavigationMenuLink>
                </Link>
                <Link href="/pricing">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="md:col-span-1 flex flex-row gap-2 justify-end pr-6">
          <Button variant={'default'} asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button variant={'secondary'} asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default HomePageHeader;
