import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { UserProfile } from '@/lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type MatchModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  matchedUser: UserProfile;
};

export default function MatchModal({ isOpen, onOpenChange, matchedUser }: MatchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative pt-12 pb-8 px-6 text-center bg-gradient-to-b from-primary/20 to-background">
          <DialogHeader>
            <DialogTitle className="text-4xl font-headline font-bold text-primary tracking-tight">
              It's a Match!
            </DialogTitle>
            <DialogDescription className="mt-2 text-md text-muted-foreground">
              You and {matchedUser.name} have liked each other.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center space-x-[-2rem] my-8">
            <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
              <AvatarImage src="https://picsum.photos/seed/user/100/100" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="z-10 bg-white rounded-full p-2 shadow-lg">
                <Heart className="h-8 w-8 text-accent" fill="hsl(var(--accent))"/>
            </div>
            <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
              <AvatarImage src={matchedUser.images[0]} />
              <AvatarFallback>{matchedUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-4">
            <Link href={`/matches/${matchedUser.id}`}>
                <Button className="w-full font-bold bg-accent hover:bg-accent/90 text-accent-foreground">Send a Message</Button>
            </Link>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Keep Swiping</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
