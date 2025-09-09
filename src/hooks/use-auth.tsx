
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUpWithEmail: (email: string, pass: string) => Promise<any>;
  signInWithEmail: (email: string, pass: string) => Promise<any>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        router.push('/discover');
      }
    });

    return () => unsubscribe();
  }, [router]);

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
       toast({
          title: 'Error signing out',
          description: (error as Error).message,
          variant: 'destructive',
        });
    }
  };

  const value = { user, loading, signOut, signUpWithEmail, signInWithEmail };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
