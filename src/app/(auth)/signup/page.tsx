
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

export default function SignUpPage() {
  const { signUpWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please re-enter your passwords.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await signUpWithEmail(email, password);
      toast({
        title: 'Account Created!',
        description: "Let's set up your profile.",
      });
      router.push('/signup/create-profile');
    } catch (error: any) {
      toast({
        title: 'Error creating account',
        description: error.message,
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
                        placeholder="yourname@school.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        />
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
