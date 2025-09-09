
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UniVibeLogo } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthenticationPage() {
  const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/discover');
    }
  }, [user, loading, router]);


  const handleGoogleSignIn = async () => {
    setIsGoogleSigningIn(true);
    try {
      await signInWithGoogle();
      // On desktop, the onAuthStateChanged listener will handle the redirect.
      // On mobile, the page will redirect away and back, so we don't need to set loading to false.
    } catch (error: any) {
      // This handles the 'popup-closed-by-user' case.
      if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        toast({
          title: 'Error signing in',
          description: error.message,
          variant: 'destructive',
        });
      }
      // If the popup is closed or another error occurs, reset the loading state
      setIsGoogleSigningIn(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await signInWithEmail(email, password);
    } catch (error: any) {
      toast({
        title: 'Error signing in',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSigningIn(false);
    }
  };
  
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
     try {
      await signUpWithEmail(email, password);
    } catch (error: any) {
      toast({
        title: 'Error signing up',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSigningUp(false);
    }
  }

  // Show a loader while hydrating, checking auth state, or if user is already logged in and redirecting.
  if (loading || user) {
     return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-background">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      );
  }

  // Show a local loader for specific sign-in actions
  const isActionLoading = isSigningIn || isSigningUp || isGoogleSigningIn;


  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
       {isActionLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="absolute left-1/4 top-0 h-72 w-72 animate-flare-1 rounded-full bg-primary/20 opacity-90 blur-[120px] filter"></div>
        <div className="absolute right-1/4 bottom-0 h-72 w-72 animate-flare-2 rounded-full bg-accent/20 opacity-90 blur-[120px] filter"></div>
        <div className="absolute left-1/2 top-1/2 h-48 w-48 animate-flare-3 rounded-full bg-primary/10 opacity-80 blur-[100px] filter"></div>
        <div className="absolute right-1/3 top-1/3 h-60 w-60 animate-flare-4 rounded-full bg-accent/10 opacity-80 blur-[110px] filter"></div>
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
              <Button onClick={handleGoogleSignIn} type="button" className="w-full font-bold h-11 text-base" disabled={isGoogleSigningIn}>
                 {isGoogleSigningIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign in with Google
              </Button>
            <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR</span>
                <Separator className="flex-1" />
            </div>
            <form onSubmit={handleEmailSignIn} className="grid gap-4">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="peer h-11 bg-input/80 border-border text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  placeholder="Password" 
                  className="peer h-11 bg-input/80 border-border text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link
                href="#"
                className="ml-auto -mt-2 inline-block text-sm text-primary/80 underline-offset-4 hover:text-primary hover:underline"
              >
                Forgot your password?
              </Link>
              <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" className="w-full h-11 text-base" type="submit" disabled={isSigningIn}>
                  {isSigningIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                   Login
                 </Button>
                 <Button variant="outline" className="w-full h-11 text-base" onClick={handleEmailSignUp} disabled={isSigningUp}>
                   {isSigningUp ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                   Sign Up
                  </Button>
              </div>
            </form>
           
          </div>
        </div>
      </div>
    </div>
  );
}
