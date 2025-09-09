
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// The 'beforeinstallprompt' event is captured by a script in public/sw-reg.js
// and the event object is stored in window.deferredPrompt.
declare global {
  interface Window {
    deferredPrompt: any;
  }
}

export function usePWA() {
  const router = useRouter();
  const [canInstall, setCanInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  
  useEffect(() => {
    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIos(isIOSDevice);
    
    // This function runs when the app is successfully installed.
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      // Hide the install prompt and clear the stored event
      setCanInstall(false);
      window.deferredPrompt = null;
      // Redirect to the app's main page after installation
      router.push('/');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // This handler will be called if the 'beforeinstallprompt' event has already fired.
    const checkExistingPrompt = () => {
        if (window.deferredPrompt) {
            console.log('Install prompt was already available.');
            setCanInstall(true);
        }
    };
    
    // This handler listens for the event in case it fires after the component mounts.
    const handleBeforeInstallPrompt = (e: Event) => {
        // The event is stored globally by sw-reg.js, we just need to update state
        console.log("'beforeinstallprompt' event was fired and captured.");
        setCanInstall(true);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check immediately in case the event has already fired.
    checkExistingPrompt();

    // The event might fire a little later, so we check again after a short delay.
    const timeoutId = setTimeout(checkExistingPrompt, 1000);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timeoutId);
    };
  }, [router]);

  const installPWA = useCallback(async (): Promise<boolean> => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log('Install prompt not available');
      return false;
    }
    
    // Show the browser's install prompt
    promptEvent.prompt();
    
    // Wait for the user to respond
    const { outcome } = await promptEvent.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      window.deferredPrompt = null;
      setCanInstall(false); // Hide the button immediately
      // The 'appinstalled' event listener will handle the rest.
      return true;
    } else {
      console.log('User dismissed the install prompt');
      // The prompt remains available if the user dismissed it.
      // We don't change canInstall state here, it should stay true.
      return false;
    }
  }, []);

  return { canInstall, isIos, installPWA };
}
