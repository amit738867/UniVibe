
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        router.push('/discover');
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const handleRedirectResult = async () => {
        setLoading(true);
        try {
            await getRedirectResult(auth);
        } catch (error: any) {
            console.error("Error getting redirect result", error);
            toast({
                title: 'Error signing in',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };
    handleRedirectResult();
  }, [toast]);


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (error: any) {
      console.error("Error signing in with Google", error);
       toast({
        title: 'Error signing in',
        description: error.message,
        variant: 'destructive',
      });
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
