'use client';

import { useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { mockProfiles, type UserProfile } from '@/lib/data';
import ProfileCard from './profile-card';
import AiMatchDialog from './ai-match-dialog';
import MatchModal from './match-modal';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function DiscoverClient() {
  const [profiles, setProfiles] = useState<UserProfile[]>(mockProfiles);
  const [isMatchModalOpen, setMatchModalOpen] = useState(false);
  const [lastMatchedUser, setLastMatchedUser] = useState<UserProfile | null>(null);
  const [exitX, setExitX] = useState<string | number>('100%');

  const paginate = (direction: number) => {
    // direction > 0 is like, direction < 0 is dislike
    if (direction > 0) {
      const likedUser = profiles[0];
      // Randomly trigger a match modal on like
      if (Math.random() > 0.5 && likedUser) {
        setLastMatchedUser(likedUser);
        setMatchModalOpen(true);
      }
    }
    setExitX(direction > 0 ? '100%' : '-100%');
    setProfiles((prev) => prev.slice(1));
  };


  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(-1); // Swipe left (dislike)
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(1); // Swipe right (like)
    }
  };

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-2xl font-headline font-semibold text-primary">No More Profiles</h2>
        <p className="text-muted-foreground mt-2">
          You've seen everyone! Try adjusting your filters or check back later.
        </p>
        <AiMatchDialog onMatchesFound={(newMatches) => {
            const newProfiles: UserProfile[] = newMatches.matches.map((m, i) => {
                const name = m.split(' ')[0];
                return {
                    id: 100 + i,
                    name: name,
                    age: Math.floor(Math.random() * 5) + 20,
                    major: 'AI Suggested',
                    distance: 'nearby',
                    interests: ['Adventure', 'Spontaneity'],
                    bio: m,
                    images: [`https://picsum.photos/seed/${name}/600/800`],
                }
            })
            setProfiles(newProfiles);
        }} />
      </div>
    );
  }

  return (
    <>
      <div className="relative h-[70vh] md:h-[75vh] flex items-center justify-center">
        <AnimatePresence initial={false}>
          {profiles
            .map((profile, index) => (
              <motion.div
                key={profile.id}
                className="absolute"
                style={{ zIndex: profiles.length - index }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
              >
                <ProfileCard profile={profile} />
              </motion.div>
            ))
            .slice(0, 1)}
        </AnimatePresence>
      </div>
      {lastMatchedUser && (
        <MatchModal
            isOpen={isMatchModalOpen}
            onOpenChange={setMatchModalOpen}
            matchedUser={lastMatchedUser}
        />
       )}
    </>
  );
}
