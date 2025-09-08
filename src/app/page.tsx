'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UniVibeLogo } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

export default function AuthenticationPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="absolute left-1/4 top-0 h-72 w-72 animate-flare-1 rounded-full bg-primary/20 opacity-70 blur-[100px] filter"></div>
        <div className="absolute right-1/4 bottom-0 h-72 w-72 animate-flare-2 rounded-full bg-accent/20 opacity-70 blur-[100px] filter"></div>
        <div className="absolute left-1/2 top-1/2 h-48 w-48 animate-flare-3 rounded-full bg-primary/10 opacity-60 blur-[80px] filter"></div>
        <div className="absolute right-1/3 top-1/3 h-60 w-60 animate-flare-4 rounded-full bg-accent/10 opacity-60 blur-[90px] filter"></div>
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center space-y-6 px-4 py-12">
           <div className="grid gap-4 text-center">
            <UniVibeLogo className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-5xl font-bold font-headline text-primary">UniVibe</h1>
            <p className="text-balance text-muted-foreground">
              Find your spark. Connect with classmates.
            </p>
          </div>
          <div className="grid w-full gap-4">
              <Button className="w-full font-bold h-11 text-base">
                Sign in with Google
              </Button>
            <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR</span>
                <Separator className="flex-1" />
            </div>
            <div className="grid gap-4">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder=" "
                  required
                  className="peer h-11 bg-input/80 border-border text-base"
                />
                <Label htmlFor="email" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-focus:top-2.5 peer-focus:text-xs peer-placeholder-shown:text-base peer-focus:text-primary">Email</Label>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  placeholder=" " 
                  className="peer h-11 bg-input/80 border-border text-base"
                />
                <Label htmlFor="password" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-focus:top-2.5 peer-focus:text-xs peer-placeholder-shown:text-base peer-focus:text-primary">Password</Label>
              </div>
            </div>
            <Link
                href="#"
                className="ml-auto -mt-2 inline-block text-sm text-primary/80 underline-offset-4 hover:text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            <div className="grid gap-4">
               <Link href="/discover" className="w-full">
                  <Button variant="outline" className="w-full h-11 text-base">
                    Login
                  </Button>
                </Link>
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
