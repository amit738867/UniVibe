
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// This is the event fired by the browser when a PWA is installable.
// We store it on the window object to avoid race conditions with React's lifecycle.
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
    // Detect if the user is on an iOS device, as installation is handled differently.
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIos(isIOSDevice);
    
    // This handler runs when the app is successfully installed.
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setCanInstall(false);
      window.deferredPrompt = null;
      // Redirect to the main part of the app after successful installation.
      router.push('/');
    };

    // This handler runs when the browser determines the app is installable.
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser install prompt from appearing.
      e.preventDefault();
      // Store the event so we can trigger the installation later.
      window.deferredPrompt = e;
      // Update our state to show the install button.
      setCanInstall(true);
      console.log("'beforeinstallprompt' event was fired and captured.");
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if the prompt was already captured, in case the event fired before this hook ran.
    if (window.deferredPrompt) {
      setCanInstall(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [router]);

  const installPWA = useCallback(async (): Promise<boolean> => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log('Install prompt not available');
      return false;
    }
    
    // Show the browser's installation prompt.
    promptEvent.prompt();
    
    // Wait for the user to respond to the prompt.
    const { outcome } = await promptEvent.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      window.deferredPrompt = null;
      setCanInstall(false);
      // The 'appinstalled' event will handle the redirect.
      return true;
    } else {
      console.log('User dismissed the install prompt');
      // The prompt is no longer available after being dismissed.
      // We'll have to wait for the browser to fire the event again.
      window.deferredPrompt = null;
      setCanInstall(false);
      return false;
    }
  }, []);

  return { canInstall, isIos, installPWA };
}
