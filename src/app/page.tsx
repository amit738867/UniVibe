'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UniVibeLogo } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';

export default function AuthenticationPage() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[350px] gap-8">
          <div className="grid gap-4 text-center">
            <UniVibeLogo className="h-12 w-12 text-primary mx-auto" />
            <h1 className="text-3xl font-bold font-headline text-primary">UniVibe</h1>
            <p className="text-balance text-muted-foreground">
              Find your spark. Connect with classmates.
            </p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Link href="/discover" className="w-full">
                  <Button className="w-full font-bold">
                    Login
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://picsum.photos/1200/1800"
          alt="Image"
          width="1200"
          height="1800"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          data-ai-hint="people social fun"
        />
      </div>
    </div>
  );
}
