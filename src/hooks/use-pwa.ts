
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This function handles the browser's install prompt event.
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Store the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI to notify the user they can install the PWA
      setCanInstall(true);
      console.log(`'beforeinstallprompt' event was fired.`);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // This function runs when the app is successfully installed.
    const handleAppInstalled = () => {
      // Hide the app-provided install promotion
      setCanInstall(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
      // Redirect to login after successful installation
      router.push('/');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if the app is already installed (running in standalone mode)
    if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
        console.log('App is already in standalone mode.');
        setCanInstall(false);
    }
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [router]);

  const installPWA = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      console.log('Install prompt not available');
      return false;
    }
    
    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, clear it
    setDeferredPrompt(null);
    
    if (outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
      // The 'appinstalled' event listener will handle the redirect.
      return true;
    } else {
      console.log('User dismissed the A2HS prompt');
      // If dismissed, we should allow the prompt to be shown again later.
      // The browser will automatically re-fire 'beforeinstallprompt' when it's ready.
      setCanInstall(true); 
      return false;
    }
  }, [deferredPrompt]);

  return { canInstall, installPWA };
}
