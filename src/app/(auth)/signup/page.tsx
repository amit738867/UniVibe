'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthState {
  signUpWithEmail: (email: string, password: string) => Promise<void>;
}

interface ToastState {
  toast: (options: { title: string; description?: string; variant?: 'default' | 'destructive' }) => void;
}

interface AuthError {
  message: string;
}

export default function SignUpPage() {
  const { signUpWithEmail } = useAuth() as AuthState;
  const { toast } = useToast() as ToastState;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);

  const timeoutPromise = (promise: Promise<void>, ms: number) => {
    return Promise.race([
      promise,
      new Promise<void>((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms)),
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 6 characters and include an uppercase letter and a number.');
      toast({
        title: 'Invalid password',
        description: 'Password must be at least 6 characters and include an uppercase letter and a number.',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      toast({
        title: 'Passwords do not match',
        description: 'Please re-enter your passwords.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await timeoutPromise(signUpWithEmail(email, password), 10000);
      toast({
        title: 'Account Created!',
        description: "Let's set up your profile.",
      });
      router.push('/signup/create-profile');
    } catch (error: AuthError) {
      setPassword('');
      setConfirmPassword('');
      setErrorMessage(error.message || 'An unexpected error occurred.');
      toast({
        title: 'Error creating account',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 h-full">
      <Card className="border-0 shadow-none sm:border sm:shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Create Your Account</CardTitle>
          <CardDescription>Welcome to UniVibe! Let's get you started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                aria-describedby={errorMessage ? 'email-error' : undefined}
              />
              {errorMessage && <p id="email-error" className="text-sm text-destructive">{errorMessage}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isLoading}
                aria-describedby={errorMessage ? 'password-error' : undefined}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                aria-describedby={errorMessage ? 'confirm-password-error' : undefined}
              />
            </div>
            <Button type="submit" className="w-full h-11 font-bold" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}