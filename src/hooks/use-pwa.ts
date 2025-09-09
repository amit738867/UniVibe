
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
  const [canInstall, setCanInstall] = useState(false);
  const router = useRouter();

  useEffect(() => {
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

    // Check if the prompt was already captured by the global script
    if (window.deferredPrompt) {
      console.log('Install prompt was already captured.');
      setCanInstall(true);
    } else {
      // If not, listen for it to be captured.
      // This covers cases where the component mounts before the event fires.
      const handleBeforeInstallPrompt = (e: Event) => {
        // The event is stored globally by sw-reg.js, we just need to update state
        console.log("'beforeinstallprompt' event was fired and captured.");
        setCanInstall(true);
      };
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      
      // Cleanup listener if component unmounts before event fires
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [router]);

  const installPWA = useCallback(async (): Promise<boolean> => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log('Install prompt not available');
      return false;
    }
    
    // Show the browser's install prompt
    await promptEvent.prompt();
    
    // Wait for the user to respond
    const { outcome } = await promptEvent.userChoice;
    
    // We can only use the prompt once, so clear it.
    window.deferredPrompt = null;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      // The 'appinstalled' event listener will handle the rest.
      return true;
    } else {
      console.log('User dismissed the install prompt');
      // If dismissed, the browser may not fire the event again,
      // so we should hide the button for this session.
      setCanInstall(false);
      return false;
    }
  }, []);

  return { canInstall, installPWA };
}
