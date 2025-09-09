
'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ProtectedRoutesLayoutProps = {
  children: ReactNode;
};

export default function ProtectedRoutesLayout({ children }: ProtectedRoutesLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If auth is not loading and there's no user, redirect to login.
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router, pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex-1 pb-24 md:pb-0"
            >
               {loading || !user ? (
                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
               ) : (
                 children
               )}
            </motion.main>
        </AnimatePresence>
      <BottomNav />
    </div>
  );
}
