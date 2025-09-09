
'use client';

import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';

const navLinks = [
  { href: '/discover' },
  { href: '/matches' },
  { href: '/profile' },
];

export default function ProtectedRoutesLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const swipeThreshold = 50;

    const currentIndex = navLinks.findIndex((link) => pathname.startsWith(link.href));

    if (offset > swipeThreshold || velocity > 500) {
      // Swiped right
      if (currentIndex > 0) {
        const prevPage = navLinks[currentIndex - 1].href;
        router.push(prevPage);
      }
    } else if (offset < -swipeThreshold || velocity < -500) {
      // Swiped left
      if (currentIndex < navLinks.length - 1) {
        const nextPage = navLinks[currentIndex + 1].href;
        router.push(nextPage);
      }
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 relative overflow-hidden">
        {loading || !user ? (
          <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <AnimatePresence
            initial={false}
            custom={1}
            mode="wait"
          >
            <motion.main
              key={pathname}
              custom={1}
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
              onDragEnd={handleDragEnd}
              className="h-full"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
