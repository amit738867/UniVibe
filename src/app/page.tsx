'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CampusConnectLogo } from '@/components/icons';

export default function AuthenticationPage() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-primary/20" />
      <div className="container relative flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center mb-8">
          <CampusConnectLogo className="h-12 w-12 text-primary" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter text-primary-foreground bg-primary/80 px-4 py-2 rounded-lg shadow-lg">
            Campus Connect
          </h1>
          <p className="max-w-md text-lg text-foreground/80 font-medium">
            Find your spark. Connect with classmates for dating or friendship.
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full max-w-sm">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Welcome Back!</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">College Email</Label>
                  <Input id="email-signin" type="email" placeholder="you@university.edu" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin">Password</Label>
                  <Input id="password-signin" type="password" required />
                </div>
                <Link href="/discover">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                    Sign In
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Join the Community</CardTitle>
                <CardDescription>Create an account with your college email.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-signup">Full Name</Label>
                  <Input id="name-signup" placeholder="Alex Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">College Email</Label>
                  <Input id="email-signup" type="email" placeholder="you@university.edu" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" required />
                </div>
                <Link href="/discover">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                    Create Account
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
