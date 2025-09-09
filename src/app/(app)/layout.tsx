
'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

const navLinks = [
  { href: '/discover' },
  { href: '/matches' },
  { href: '/profile' },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ProtectedRoutesLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const currentIndex = navLinks.findIndex((link) => pathname.startsWith(link.href));

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      // Swipe left
      const nextIndex = Math.min(currentIndex + 1, navLinks.length - 1);
      if(currentIndex != nextIndex) {
        router.push(navLinks[nextIndex].href);
      }
    } else if (swipe > swipeConfidenceThreshold) {
      // Swipe right
      const prevIndex = Math.max(currentIndex - 1, 0);
      if(currentIndex != prevIndex) {
        router.push(navLinks[prevIndex].href);
      }
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const previousPath = sessionStorage.getItem('previousPath');
    if (previousPath) {
        const previousIndex = navLinks.findIndex(link => previousPath.startsWith(link.href));
        if (previousIndex !== -1 && currentIndex !== -1) {
          const newDirection = currentIndex > previousIndex ? 1 : -1;
          setDirection(newDirection);
        }
    }
    sessionStorage.setItem('previousPath', pathname);
  }, [pathname, currentIndex]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative overflow-hidden">
        {loading || !user ? (
          <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={pathname}
              className="h-full"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
