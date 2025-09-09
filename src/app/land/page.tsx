
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Share } from 'lucide-react';
import { UniVibeLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/use-pwa';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { canInstall, isIos, installPWA } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);
  const router = useRouter();

  const handleInstallClick = async () => {
    if (!canInstall) return;
    setIsInstalling(true);
    try {
      const installed = await installPWA();
      if (!installed) {
        // If the user dismissed the prompt, we reset the state
        // so they can try again.
        setIsInstalling(true);
      }
      // If installation is successful, the `appinstalled` event in the hook
      // will handle redirecting the user.
    } catch (e) {
      console.error("Installation failed", e);
      setIsInstalling(false);
    }
  };

  const renderInstallUI = () => {
    if (isIos) {
      return (
         <div className="text-center bg-secondary/50 p-4 rounded-lg border">
            <h3 className="font-bold">Install on your iPhone</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tap the <Share className="inline-block h-4 w-4 mx-1" /> Share button in Safari and then tap &quot;Add to Home Screen&quot;.
            </p>
         </div>
      );
    }

    if (canInstall) {
       return (
         <Button
            size="lg"
            className="h-14 w-64 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg disabled:bg-accent/50 disabled:cursor-not-allowed"
            onClick={handleInstallClick}
            disabled={isInstalling}
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
       );
    }

    // If not iOS and not installable, show nothing or a message.
    // An empty div is fine for now to avoid confusion.
    return <div className="h-[5rem]" />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/20 opacity-90 blur-[120px] filter"
          animate={{
            opacity: 1,
            scale: [1, 1.1, 1],
            transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-accent/20 opacity-90 blur-[120px] filter"
           animate={{
            opacity: 1,
            scale: [1, 1.1, 1],
            transition: { duration: 10, delay: 3, repeat: Infinity, ease: 'easeInOut' },
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
          Install the app to your home screen for the best, full-screen experience.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 min-h-[5rem]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
            {renderInstallUI()}
        </motion.div>
      </div>
    </div>
  );
}
