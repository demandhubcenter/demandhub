
"use client";

import React,
{ createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { AdminAuthProvider } from './admin-auth-context';

interface User {
  name: string | null;
  email: string | null;
  uid: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  country: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<FirebaseUser>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<Omit<User, 'uid' | 'email' | 'emailVerified'>>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            let phoneNumber = null;
            let country = null;
            // The extra user data is stored in photoURL as a JSON string.
            if (firebaseUser.photoURL) {
              try {
                const extraData = JSON.parse(firebaseUser.photoURL);
                phoneNumber = extraData.phoneNumber || null;
                country = extraData.country || null;
              } catch (e) {
                console.error("Could not parse user profile data from photoURL");
              }
            }

            setUser({
                email: firebaseUser.email,
                name: firebaseUser.displayName,
                uid: firebaseUser.uid,
                emailVerified: firebaseUser.emailVerified,
                phoneNumber,
                country,
            });
        } else {
            setUser(null);
        }
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };
  
  const updateUser = (data: Partial<Omit<User, 'uid' | 'email' | 'emailVerified'>>) => {
    setUser(currentUser => {
        if (currentUser) {
            return { ...currentUser, ...data };
        }
        return null;
    });
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUser }}>
      <AdminAuthProvider>
        {!loading && children}
      </AdminAuthProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
