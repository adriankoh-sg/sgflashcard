import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <Card className="w-auto m-2">
        <CardHeader>
          <CardTitle>SG Flash Card eLearning</CardTitle>
          <CardDescription>
            Using flash card to create fun eLearning for students!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <Button variant="default" className="w-full">
            For Student
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link href={'/dashboard'}>For Tutor</Link>
          </Button>
        </CardContent>
        <CardFooter className="text-sm">
          <p>
            Support:{' '}
            <a href="mailto:koh.adrian.2019@gmail.com">
              koh.adrian.2019@gmail.com
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
