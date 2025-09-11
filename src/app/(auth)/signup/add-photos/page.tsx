
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, User, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { updateProfile } from 'firebase/auth';

export default function AddPhotosPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({ title: "Not authenticated!", variant: "destructive" });
        router.push('/signup');
        return;
    }
    if (!photo) {
        toast({ title: "Please upload a profile picture", variant: "destructive" });
        return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would upload the photo to Firebase Storage
      // and get a download URL to update the user's photoURL.
      // For this demo, we'll use a placeholder, but in a real scenario
      // you'd use the uploaded `photo` data URI.
      const photoURL = `https://picsum.photos/seed/${user.uid}/200/200`;
      await updateProfile(user, { photoURL });
      
      toast({
        title: 'Looking good!',
        description: 'Just one more step.',
      });
      router.push('/signup/about-you');
    } catch (error: any) {
      toast({
        title: 'Error uploading photo',
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
          <CardTitle className="text-3xl font-headline">Add a Profile Photo</CardTitle>
          <CardDescription>A great photo helps people recognize you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
            <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
            />
            <div className="relative">
                <Avatar className="w-48 h-48 border-4 border-muted">
                    <AvatarImage src={photo ?? undefined} />
                    <AvatarFallback className="bg-secondary">
                        <User className="w-24 h-24 text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
                <Button 
                    type="button"
                    size="icon"
                    className="absolute -bottom-2 -right-2 rounded-full h-12 w-12 border-4 border-background"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    >
                    <Camera className="w-6 h-6" />
                </Button>
            </div>
            
            <p className="text-sm text-muted-foreground pt-4">
                Click the camera to upload a photo.
            </p>

            <Button type="submit" className="w-full h-11 font-bold" disabled={isLoading || !photo}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
