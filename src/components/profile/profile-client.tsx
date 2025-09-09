
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import PhotoGrid from "./photo-grid";
import ProfileForm from "./profile-form";
import { motion } from "framer-motion";

const initialPhotos = [
  { id: 1, url: "https://picsum.photos/seed/user/400/400", isVerified: true },
  { id: 2, url: "https://picsum.photos/seed/user2/400/400", isVerified: false },
  { id: 3, url: "https://picsum.photos/seed/user3/400/400", isVerified: false },
  { id: 4, url: "https://picsum.photos/seed/user4/400/400", isVerified: false },
];

export default function ProfileClient() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState(initialPhotos);

  // Initialize with user data or fallbacks
  const [profileData, setProfileData] = useState({
    name: user?.displayName ?? "Alex Doe",
    age: 22,
    major: "Marketing",
    bio: "Just a student trying to navigate college life. I love exploring the city, trying new food spots, and spontaneous adventures. Looking for someone with a good sense of humor!",
    interests: ["Photography", "Traveling", "Foodie", "Concerts"],
  });
  
  const displayName = user?.displayName ?? profileData.name;
  const photoURL = user?.photoURL ?? `https://picsum.photos/seed/${displayName}/200/200`;

  const handleProfileUpdate = (newData: Partial<typeof profileData>) => {
    setProfileData(prev => ({...prev, ...newData}));
  }

  return (
    <div className="space-y-6">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <div className="h-36 sm:h-48 bg-gradient-to-r from-primary/30 to-accent/30 rounded-lg" />
            <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 w-full px-4">
                <div className="flex flex-col items-center">
                    <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-background shadow-lg">
                        <AvatarImage src={photoURL} alt={displayName} data-ai-hint="person face" />
                        <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="text-center mt-3">
                        <h1 className="text-2xl sm:text-3xl font-headline font-bold">{displayName}, {profileData.age}</h1>
                        <p className="text-muted-foreground text-sm sm:text-base">{profileData.major}</p>
                    </div>
                </div>
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-20 sm:pt-24 space-y-6"
        >
            <PhotoGrid initialPhotos={photos.map(p => p.id === 1 ? {...p, url: user?.photoURL ?? p.url} : p)} />
            <ProfileForm userProfile={profileData} onProfileUpdate={handleProfileUpdate} />
        </motion.div>
    </div>
  );
}
