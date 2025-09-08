
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import ProfileForm from "./profile-form";
import PhotoGrid from "./photo-grid";
import { useAuth } from "@/hooks/use-auth";

const userProfile = {
  name: "Alex Doe",
  age: 22,
  major: "Marketing",
  bio: "Just a student trying to navigate college life. I love exploring the city, trying new food spots, and spontaneous adventures. Looking for someone with a good sense of humor!",
  interests: ["Photography", "Traveling", "Foodie", "Concerts"],
  photos: [
    { id: 1, url: "https://picsum.photos/seed/user/400/400", isVerified: true },
    { id: 2, url: "https://picsum.photos/seed/user2/400/400", isVerified: false },
    { id: 3, url: "https://picsum.photos/seed/user3/400/400", isVerified: false },
    { id: 4, url: "https://picsum.photos/seed/user4/400/400", isVerified: false },
  ],
};

export default function ProfileClient() {
  const { user } = useAuth();
  
  const displayName = user?.displayName ?? userProfile.name;
  const photoURL = user?.photoURL ?? "https://picsum.photos/seed/user/200/200";

  return (
    <div className="space-y-6">
        <div className="relative">
            <div className="h-36 sm:h-48 bg-gradient-to-r from-primary/30 to-accent/30 rounded-lg" />
            <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 w-full px-4">
                <div className="flex flex-col items-center">
                    <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-background shadow-lg">
                        <AvatarImage src={photoURL} alt={displayName} data-ai-hint="person face" />
                        <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center mt-3">
                        <h1 className="text-2xl sm:text-3xl font-headline font-bold">{displayName}, {userProfile.age}</h1>
                        <p className="text-muted-foreground text-sm sm:text-base">{userProfile.major}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="pt-20 sm:pt-24 space-y-6">
            <PhotoGrid initialPhotos={userProfile.photos} />
            <ProfileForm userProfile={userProfile} />
        </div>
    </div>
  );
}
