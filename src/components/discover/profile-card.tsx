import Image from 'next/image';
import { MapPin } from 'lucide-react';
import type { UserProfile } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type ProfileCardProps = {
  profile: UserProfile;
};

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="w-[85vw] max-w-sm h-[65vh] md:h-[70vh] shadow-2xl rounded-2xl overflow-hidden relative group">
      <Image
        src={profile.images[0]}
        alt={profile.name}
        fill
        className="object-cover"
        data-ai-hint="profile picture"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-headline font-bold">{profile.name}</h2>
          <p className="text-2xl font-light">{profile.age}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-200 mt-1">
          <MapPin className="h-4 w-4" />
          <span>{profile.distance}</span>
          <span className="font-bold">&middot;</span>
          <span>{profile.major}</span>
        </div>
        <p className="mt-4 text-sm text-gray-300 line-clamp-2">{profile.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <Badge key={interest} variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
