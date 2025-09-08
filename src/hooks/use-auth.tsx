
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    // This function runs when the provider mounts.
    const handleAuthFlow = async () => {
      setLoading(true);
      try {
        // First, check if there's a redirect result to process.
        const result = await getRedirectResult(auth);
        if (result) {
          // If there was a sign-in result, Firebase's onAuthStateChanged
          // will handle setting the user and redirecting.
          // We can show a toast here to confirm login.
          toast({
            title: `Welcome back, ${result.user.displayName}!`,
            description: "You've successfully signed in.",
          });
          // After processing, onAuthStateChanged will fire with the new user.
        }
      } catch (error: any) {
        console.error("Error getting redirect result", error);
        if (error.code !== 'auth/cancelled-popup-request' && error.code !== 'auth/popup-closed-by-user') {
           toast({
              title: 'Error signing in',
              description: error.message,
              variant: 'destructive',
          });
        }
      }

      // After handling any potential redirect, set up the listener.
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        if (currentUser) {
          router.push('/discover');
        } else {
          // Only redirect to login if we are not in the middle of a redirect sign-in
          getRedirectResult(auth).then((result) => {
            if (!result) {
              router.push('/');
            }
          });
        }
      });
      
      // Return the unsubscribe function to be called on cleanup.
      return unsubscribe;
    };
    
    // Call the async function and store the unsubscribe function it returns.
    const unsubscribePromise = handleAuthFlow();

    // The actual cleanup function for useEffect.
    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, [router, toast]);


  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      if (isMobile) {
        // Redirect flow for mobile
        await signInWithRedirect(auth, provider);
      } else {
        // Popup flow for desktop
        await signInWithPopup(auth, provider);
      }
    } catch (error: any) {
      console.error("Error signing in with Google", error);
       if (error.code !== 'auth/popup-closed-by-user') {
         toast({
          title: 'Error signing in',
          description: error.message,
          variant: 'destructive',
        });
       }
       setLoading(false);
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
    } catch (error) {
      console.error("Error signing out", error);
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
