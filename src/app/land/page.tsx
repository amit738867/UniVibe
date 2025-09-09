
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Share } from 'lucide-react';
import { UniVibeLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/use-pwa';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LandingPage() {
  const { canInstall, isIos, installPWA } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstallClick = async () => {
    if (!canInstall) return;
    setIsInstalling(true);
    try {
        await installPWA();
        // The `appinstalled` event handler in the hook will redirect.
        // We leave the installing state as is, to prevent flicker.
    } catch (error) {
        console.error("Installation failed", error);
        // If there's an error, allow the user to try again.
        setIsInstalling(false);
    }
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

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
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
          className="mt-3 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          The best experience is on our app. Install it to your home screen for quick access and a full-screen view.
        </motion.p>

        <motion.div
          className="mt-10 w-full flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
            {isIos ? (
                 <Alert>
                    <Share className="h-4 w-4" />
                    <AlertTitle>To install the app</AlertTitle>
                    <AlertDescription>
                        Tap the Share icon in Safari and then "Add to Home Screen".
                    </AlertDescription>
                </Alert>
            ) : (
                <motion.div
                    animate={canInstall && !isInstalling ? {
                        scale: [1, 1.05, 1],
                        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    } : {}}
                >
                  <Button
                    size="lg"
                    className="h-14 w-64 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg disabled:bg-accent/50 disabled:cursor-not-allowed"
                    onClick={handleInstallClick}
                    disabled={!canInstall || isInstalling}
                  >
                    {isInstalling ? (
                        <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            Installing...
                        </>
                    ) : (
                        <>
                            <Download className="mr-3 h-6 w-6" />
                            Install App
                        </>
                    )}
                  </Button>
                </motion.div>
            )}
        </motion.div>
      </div>
    </div>
  );
}
