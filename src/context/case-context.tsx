
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './auth-context';
import { db } from '@/lib/firebase';
import { 
    collection, 
    query, 
    where, 
    getDocs, 
    doc, 
    setDoc, 
    updateDoc, 
    arrayUnion,
    deleteDoc,
    orderBy
} from "firebase/firestore";

export interface CaseConversation {
    author: { name: string; role: 'Client' | 'Support Agent'; avatar: string };
    timestamp: string;
    text: string;
}

export interface Case {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  conversation: CaseConversation[];
  evidence?: {
    name: string;
    url: string;
    type: string;
  };
  user?: {
    name: string | null;
    email: string | null;
    uid: string;
    country: string | null;
    phoneNumber: string | null;
  }
}

interface CaseContextType {
  cases: Case[];
  allCases: Case[]; // For admin view
  loading: boolean;
  addCase: (newCase: Omit<Case, 'id'>, newId: string) => Promise<void>;
  getCaseById: (id: string) => Promise<Case | null | undefined>;
  addCommentToCase: (caseId: string, comment: CaseConversation) => Promise<void>;
  deleteCase: (caseId: string) => Promise<void>;
  selectedCase: Case | null;
  setSelectedCase: (caseData: Case | null) => void;
  fetchAllCases: () => Promise<void>;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [allCases, setAllCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserCases = useCallback(async (uid: string) => {
    setLoading(true);
    const q = query(collection(db, "cases"), where("user.uid", "==", uid), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const userCases = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Case));
    setCases(userCases);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (user?.uid) {
      fetchUserCases(user.uid);
    } else {
      setCases([]);
      setSelectedCase(null);
      setLoading(false);
    }
  }, [user, fetchUserCases]);

  const fetchAllCases = useCallback(async () => {
    setLoading(true);
    const q = query(collection(db, "cases"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const allDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Case));
    setAllCases(allDocs);
    setLoading(false);
  }, []);

  const addCase = async (newCaseData: Omit<Case, 'id'>, newId: string) => {
    const caseRef = doc(db, "cases", newId);
    await setDoc(caseRef, newCaseData);
    
    const newCaseWithId = { ...newCaseData, id: newId };
    setCases(prev => [newCaseWithId, ...prev]);
    setAllCases(prev => [newCaseWithId, ...prev]);
  };

  const getCaseById = async (id: string) => {
     // This function is less critical with Firestore but can be kept for consistency
     // Direct fetching or context state can be used instead.
     // For now, it will check the loaded contexts.
     let foundCase = cases.find(c => c.id === id);
     if (foundCase) return foundCase;
     foundCase = allCases.find(c => c.id === id);
     return foundCase || null;
  }

  const addCommentToCase = async (caseId: string, comment: CaseConversation) => {
    const caseRef = doc(db, "cases", caseId);
    await updateDoc(caseRef, {
        conversation: arrayUnion(comment)
    });
     // Optimistically update local state for immediate feedback
    const updateCaseInList = (list: Case[]) => list.map(c => 
        c.id === caseId ? { ...c, conversation: [...c.conversation, comment] } : c
    );
    setCases(updateCaseInList);
    setAllCases(updateCaseInList);
    if(selectedCase?.id === caseId){
        setSelectedCase(prev => prev ? {...prev, conversation: [...prev.conversation, comment]} : null);
    }
  };

  const deleteCase = async (caseId: string) => {
    await deleteDoc(doc(db, "cases", caseId));
    // Remove from local state
    setCases(prevCases => prevCases.filter(c => c.id !== caseId));
    setAllCases(prevCases => prevCases.filter(c => c.id !== caseId));
  }

  return (
    <CaseContext.Provider value={{ cases, allCases, loading, fetchAllCases, addCase, getCaseById, addCommentToCase, deleteCase, selectedCase, setSelectedCase }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCases = (): CaseContextType => {
  const context = useContext(CaseContext);
  if (context === undefined) {
    throw new Error('useCases must be used within a CaseProvider');
  }
  return context;
};
