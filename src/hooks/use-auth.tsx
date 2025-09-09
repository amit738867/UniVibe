
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useIsMobile } from './use-mobile';
import { useToast } from './use-toast';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<any>;
  signInWithEmail: (email: string, pass: string) => Promise<any>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isProcessingRedirect, setIsProcessingRedirect] = useState(true);
  const router = useRouter();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const processRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // This means the user has just signed in via redirect.
          toast({
            title: `Welcome, ${result.user.displayName}!`,
            description: "You've successfully signed in.",
          });
          // The onAuthStateChanged listener below will handle the user state and redirect to /discover
        }
      } catch (error: any) {
        console.error("Error during getRedirectResult:", error);
        toast({
          title: 'Sign-in Error',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setIsProcessingRedirect(false);
      }
    };
    processRedirectResult();
  }, [toast]);

  useEffect(() => {
    // This listener handles auth state changes from all sources (popup, redirect, session persistence)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        // Only redirect if we are not on the landing page, to avoid loops
        if(window.location.pathname !== '/discover') {
          router.push('/discover');
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loading = authLoading || isProcessingRedirect;

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        'auth_domain': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    });

    try {
      if (isMobile) {
        // This will navigate away and then back, the result is handled by getRedirectResult
        await signInWithRedirect(auth, provider);
      } else {
        // This will open a popup
        const result = await signInWithPopup(auth, provider);
        toast({
            title: `Welcome, ${result.user.displayName}!`,
            description: "You've successfully signed in.",
        });
        // onAuthStateChanged will handle the redirect
      }
    } catch (error: any) {
      console.error("Error signing in with Google", error);
       if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
         toast({
          title: 'Error signing in',
          description: error.message,
          variant: 'destructive',
        });
       }
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  }

  const signInWithEmail = async (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out", error);
       toast({
          title: 'Error signing out',
          description: (error as Error).message,
          variant: 'destructive',
        });
    }
  };

  const value = { user, loading, signInWithGoogle, signOut, signUpWithEmail, signInWithEmail };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
