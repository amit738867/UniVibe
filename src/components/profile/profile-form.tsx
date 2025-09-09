
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be less than 50 characters." }),
  bio: z.string().max(160, { message: "Bio must be less than 160 characters." }).optional(),
  interests: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type ProfileFormProps = {
  userProfile: {
    name: string;
    bio: string;
    interests: string[];
  };
  onProfileUpdate: (data: Partial<ProfileFormValues & { interests: string[] }>) => void;
};

export default function ProfileForm({ userProfile, onProfileUpdate }: ProfileFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userProfile.name,
      bio: userProfile.bio,
      interests: userProfile.interests.join(', '),
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
        toast({ title: 'Error', description: 'You must be logged in to update your profile.', variant: 'destructive' });
        return;
    }
    
    setIsSaving(true);
    try {
        await updateProfile(user, {
            displayName: data.name,
            // You might want to store bio and interests in Firestore/RTDB
        });

        const interestsArray = data.interests ? data.interests.split(',').map(i => i.trim()) : [];
        onProfileUpdate({ ...data, interests: interestsArray });

        toast({
            title: 'Profile Updated',
            description: 'Your changes have been saved successfully.',
        });
    } catch (error: any) {
        toast({
            title: 'Update Failed',
            description: error.message,
            variant: 'destructive',
        });
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Information</CardTitle>
        <CardDescription>Update your profile to help others get to know you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a little about yourself" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Hiking, Coding, Art" {...field} />
                  </FormControl>
                   <p className="text-xs text-muted-foreground">Separate interests with a comma.</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
