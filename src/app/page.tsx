'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UniVibeLogo } from '@/components/icons';

export default function AuthenticationPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="absolute left-1/4 top-0 h-72 w-72 animate-flare-1 rounded-full bg-primary/20 opacity-50 blur-3xl filter"></div>
        <div className="absolute right-1/4 bottom-0 h-72 w-72 animate-flare-2 rounded-full bg-accent/20 opacity-50 blur-3xl filter"></div>
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-6 px-4 py-12">
           <div className="grid gap-4 text-center">
            <UniVibeLogo className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-5xl font-bold font-headline text-primary">UniVibe</h1>
            <p className="text-balance text-muted-foreground">
              Find your spark. Connect with classmates.
            </p>
          </div>
          <div className="grid w-full gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                required
                className="bg-input/80 border-border"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm text-primary/80 underline-offset-4 hover:text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required  className="bg-input/80 border-border"/>
            </div>
            <div className="grid gap-4">
               <Link href="/discover" className="w-full">
                  <Button className="w-full font-bold">
                    Login
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Sign in with Google
                </Button>
            </div>
           
          </div>
           <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="font-semibold text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
