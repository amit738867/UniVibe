
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
          // User successfully signed in via redirect.
          // onAuthStateChanged will handle the user state update and redirect.
          toast({
            title: `Welcome, ${result.user.displayName}!`,
            description: "You've successfully signed in.",
          });
        }
      } catch (error: any) {
        // This catches errors from the redirect result, such as the user closing the popup.
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
          console.error("Error during getRedirectResult:", error);
          toast({
            title: 'Sign-in Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      } finally {
        // This is crucial. We're done processing the redirect.
        setIsProcessingRedirect(false);
      }
    };

    processRedirectResult();
  }, [toast]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        // This is the single source of truth for redirecting on successful login.
        router.push('/discover');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // The app is in a loading state if the initial auth state hasn't been determined
  // OR if we are actively processing a sign-in redirect.
  const loading = authLoading || isProcessingRedirect;

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        'auth_domain': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    });

    if (isMobile) {
      // Don't await this, the page will redirect away.
      await signInWithRedirect(auth, provider);
    } else {
      // Use popup for desktop.
      try {
        await signInWithPopup(auth, provider);
        // onAuthStateChanged will handle the redirect.
      } catch (error: any) {
        // Re-throw specific, actionable errors for the UI to handle.
        if (error.code === 'auth/popup-closed-by-user') {
          throw error;
        }
        // Log other unexpected errors.
        console.error("Error during signInWithPopup:", error);
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
      // Redirect to login page after sign-out.
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
