'use client';

import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState, useRef } from 'react';
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
  const [direction, setDirection] = useState(1);
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const currentIndex = navLinks.findIndex((link) => prevPathnameRef.current.startsWith(link.href));
    const newIndex = navLinks.findIndex((link) => pathname.startsWith(link.href));
        
    if (currentIndex !== -1 && newIndex !== -1) {
        if (newIndex > currentIndex) {
            setDirection(1);
        } else if (newIndex < currentIndex) {
            setDirection(-1);
        }
    }

    // Reset navigation state when pathname changes
    if (prevPathnameRef.current !== pathname) {
      setIsNavigating(false);
    }

    prevPathnameRef.current = pathname;
  }, [pathname]);

  const handleDragStart = () => {
    setIsNavigating(true);
  };

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const swipeThreshold = 50;

    const currentIndex = navLinks.findIndex((link) => pathname.startsWith(link.href));

    if (currentIndex === -1) {
      setIsNavigating(false);
      return;
    }

    let shouldNavigate = false;
    let targetPage = '';

    if (offset > swipeThreshold || velocity > 500) {
      // Swiped right (to a previous tab)
      if (currentIndex > 0) {
        targetPage = navLinks[currentIndex - 1].href;
        shouldNavigate = true;
      }
    } else if (offset < -swipeThreshold || velocity < -500) {
      // Swiped left (to a next tab)
      if (currentIndex < navLinks.length - 1) {
        targetPage = navLinks[currentIndex + 1].href;
        shouldNavigate = true;
      }
    }

    if (shouldNavigate) {
      // Small delay to allow drag animation to complete before navigation
      setTimeout(() => {
        router.push(targetPage);
      }, 50);
    } else {
      setIsNavigating(false);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 1,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1,
    }),
  };

  const dragVariants = {
    enter: {
      x: 0,
      opacity: 1,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
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
            custom={direction}
            mode="wait"
          >
            <motion.main
              key={pathname}
              custom={direction}
              variants={isNavigating ? dragVariants : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 50, damping: 10, duration: 0.2 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              whileDrag={{ 
                scale: 0.95,
                rotateY: 5,
              }}
              className="absolute w-full h-full"
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
