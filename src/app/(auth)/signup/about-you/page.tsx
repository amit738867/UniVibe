
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutYouPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({ title: "Not authenticated!", variant: "destructive" });
        router.push('/signup');
        return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would save this data to your database (e.g., Firestore)
      console.log("Saving bio:", bio);
      console.log("Saving interests:", interests.split(',').map(i => i.trim()));

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'All Done!',
        description: 'Welcome to UniVibe. Let\'s find your spark!',
      });
      router.push('/discover');
    } catch (error: any) {
      toast({
        title: 'Error saving information',
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
          <CardTitle className="text-3xl font-headline">Finish Your Profile</CardTitle>
          <CardDescription>This helps others get to know you better.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Your Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us something fun about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                maxLength={160}
                disabled={isLoading}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="interests">Your Hobbies</Label>
              <Input
                id="interests"
                placeholder="e.g., Hiking, Coding, Art"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Separate hobbies with a comma.</p>
            </div>
            
            <Button type="submit" className="w-full h-11 font-bold bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
              {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finishing Up...
                </>
              ) : (
                'Complete Profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

