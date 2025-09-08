'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoVerification } from './photo-verification';

type Photo = {
  id: number;
  url: string;
  isVerified: boolean;
};

type PhotoGridProps = {
  initialPhotos: Photo[];
};

export default function PhotoGrid({ initialPhotos }: PhotoGridProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);

  const handleVerification = (photoId: number, isGenuine: boolean) => {
    setPhotos(prevPhotos => 
      prevPhotos.map(p => p.id === photoId ? { ...p, isVerified: isGenuine } : p)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Photos</CardTitle>
        <CardDescription>Add or verify your photos. A verified photo builds trust!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <PhotoVerification 
              key={photo.id}
              photo={photo}
              onVerificationResult={(isGenuine) => handleVerification(photo.id, isGenuine)}
            />
          ))}
          <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer">
            <div className="text-center">
              <Plus className="h-8 w-8 mx-auto" />
              <p className="text-sm mt-2">Add Photo</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
