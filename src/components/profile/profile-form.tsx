'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type ProfileFormProps = {
  userProfile: {
    bio: string;
    interests: string[];
    name: string;
    age: number;
    major: string;
  };
};

export default function ProfileForm({ userProfile }: ProfileFormProps) {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      bio: userProfile.bio,
      interests: userProfile.interests.join(', '),
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved successfully.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Information</CardTitle>
        <CardDescription>Update your bio and interests to help others get to know you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
