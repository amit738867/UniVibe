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

interface AuthState {
  user: { id: string } | null; // Adjust based on actual user shape
  loading: boolean;
}

const steps = [
  '/signup',
  '/signup/create-profile',
  '/signup/add-photos',
  '/signup/about-you',
];

export default function SignUpLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth() as AuthState;
  const router = useRouter();
  const pathname = usePathname();
  const normalizedPathname = pathname.split('?')[0].replace(/\/$/, '');
  const currentStepIndex = steps.indexOf(normalizedPathname);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      timeout = setTimeout(() => {
        console.error('Authentication loading timed out');
        router.push('/error');
      }, 10000);
      return;
    }

    if (user && normalizedPathname === '/signup') {
      router.push('/signup/create-profile');
    }

    if (!user && normalizedPathname !== '/signup') {
      router.push('/signup');
    }

    return () => clearTimeout(timeout);
  }, [user, loading, router, normalizedPathname]);

  const handleBack = () => {
    if (currentStepIndex > 0) {
      router.push(steps[currentStepIndex - 1]);
    } else {
      router.push('/');
    }
  };

  const variants = {
    enter: { x: '100%', opacity: 0 },
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: { zIndex: 0, x: '-100%', opacity: 0 },
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
            <button onClick={handleBack} className="flex items-center gap-2" aria-label="Go back">
              <ArrowLeft className="h-5 w-5 text-primary" />
            </button>
            <Link href="/" className="flex items-center gap-2" aria-label="UniVibe Home">
              <UniVibeLogo className="h-7 w-7 text-primary" />
              <span className="hidden font-headline text-xl font-bold text-primary sm:inline-block">
                UniVibe
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-start w-full pt-4 md:pt-8">
        <SignUpProgressBar
          currentStep={currentStepIndex >= 0 ? currentStepIndex + 1 : 1}
          totalSteps={steps.length}
        />
        <div className="relative overflow-hidden w-full flex-1 mt-4 md:mt-8">
          <AnimatePresence initial={false} mode="wait">
            <motion.main
              key={pathname}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 200, damping: 20 },
                opacity: { duration: 0.15 },
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