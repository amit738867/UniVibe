'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type ProtectedRoutesLayoutProps = {
  children: ReactNode;
};

export default function ProtectedRoutesLayout({ children }: ProtectedRoutesLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
       <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-1 pb-24 md:pb-0"
          >
           {children}
          </motion.main>
        </AnimatePresence>
      <BottomNav />
    </div>
  );
}
