
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { UniVibeLogo } from '@/components/icons';
import SignUpProgressBar from '@/components/auth/progress-bar';

const steps = [
  '/signup',
  '/signup/create-profile',
  '/signup/add-photos',
  '/signup/about-you',
];

export default function SignUpLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const currentStepIndex = steps.indexOf(pathname);

  useEffect(() => {
    if (!loading) {
      if (user && pathname === '/signup') {
        router.push('/signup/create-profile');
      } else if (!user && pathname !== '/signup') {
        router.push('/signup');
      }
    }
  }, [user, loading, router, pathname]);

  const handleBack = () => {
    if (currentStepIndex > 0) {
        router.back();
    } else {
        router.push('/');
    }
  }

  const variants = {
    enter: {
      x: '100%',
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      x: '-100%',
      opacity: 0,
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container flex h-16 items-center px-4">
                <div className="flex items-center gap-4">
                    <button onClick={handleBack} className="flex items-center gap-2">
                        <ArrowLeft className="h-5 w-5 text-primary" />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <UniVibeLogo className="h-7 w-7 text-primary" />
                        <span className="hidden font-headline text-xl font-bold text-primary sm:inline-block">
                        UniVibe
                        </span>
                    </Link>
                </div>
            </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-start w-full pt-4 md:pt-8">
            <SignUpProgressBar currentStep={currentStepIndex + 1} totalSteps={steps.length} />
            <div className="relative overflow-hidden w-full flex-1 mt-4 md:mt-8">
                <AnimatePresence initial={false} mode="wait">
                    <motion.main
                        key={pathname}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="w-full h-full"
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
            </div>
        </div>
    </div>
  );
}
