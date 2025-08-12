
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './auth-context';

// IMPORTANT: Replace this with your actual Firebase User ID (UID)
// You can find your UID in the Firebase Console -> Authentication -> Users table.
const ADMIN_UID = 'REPLACE_WITH_YOUR_FIREBASE_ADMIN_UID';

interface AdminAuthContextType {
  isAdmin: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.uid === ADMIN_UID) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <AdminAuthContext.Provider value={{ isAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
