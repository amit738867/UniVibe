
'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { UniVibeLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/use-pwa';

export default function LandingPage() {
  const { canInstall, installPWA } = usePWA();

  const handleInstallClick = async () => {
    if (!canInstall) return;
    await installPWA();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/20 opacity-90 blur-[120px] filter"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, ease: 'easeOut' },
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-accent/20 opacity-90 blur-[120px] filter"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, delay: 0.5, ease: 'easeOut' },
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <UniVibeLogo className="h-24 w-24 text-primary" />
        </motion.div>

        <motion.h1
          className="mt-6 text-5xl md:text-6xl font-bold font-headline text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          UniVibe
        </motion.h1>

        <motion.p
          className="mt-3 max-w-md text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          The best experience is on our app. Install it to your home screen for quick access and a full-screen view.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
            <motion.div
                animate={canInstall ? {
                    scale: [1, 1.05, 1],
                    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                } : {}}
            >
              <Button
                size="lg"
                className="h-14 w-64 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg disabled:bg-accent/50 disabled:cursor-not-allowed"
                onClick={handleInstallClick}
                disabled={!canInstall}
              >
                <Download className="mr-3 h-6 w-6" />
                Install App
              </Button>
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
