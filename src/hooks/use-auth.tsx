
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
    // This effect runs once on mount to handle the redirect result from Google Sign-In.
    const processRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // User has successfully signed in via redirect.
          // The onAuthStateChanged listener below will handle the user state update.
          toast({
            title: `Welcome, ${result.user.displayName}!`,
            description: "You've successfully signed in.",
          });
        }
      } catch (error: any) {
        console.error("Error during getRedirectResult:", error);
        toast({
          title: 'Sign-in Error',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        // This is critical to signal that we are done checking for a redirect result.
        setIsProcessingRedirect(false);
      }
    };
    processRedirectResult();
  }, [toast]);

  useEffect(() => {
    // This is the primary listener for any auth state changes.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        if (!['/discover', '/matches', '/profile'].some(path => window.location.pathname.startsWith(path))) {
          router.push('/discover');
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  // The overall loading state depends on both the initial auth check and the redirect processing.
  const loading = authLoading || isProcessingRedirect;

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // This is a critical fix for mobile redirect flows. It explicitly tells
    // Firebase which domain to use for its authentication helper page.
    provider.setCustomParameters({
        'auth_domain': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    });

    try {
      if (isMobile) {
        // On mobile, we use signInWithRedirect. The result is handled by getRedirectResult.
        await signInWithRedirect(auth, provider);
      } else {
        // On desktop, signInWithPopup is a better user experience.
        const result = await signInWithPopup(auth, provider);
        toast({
            title: `Welcome, ${result.user.displayName}!`,
            description: "You've successfully signed in.",
        });
        // onAuthStateChanged will handle the user state update and redirect.
      }
    } catch (error: any) {
       // Avoid showing an error toast if the user simply closes the popup.
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
      router.push('/login');
    } catch (error) {
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
