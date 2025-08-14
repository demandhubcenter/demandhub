

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './auth-context';
import { notifyAdminOnNewCase } from '@/ai/flows/notify-admin-flow';

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
  addCase: (newCase: Omit<Case, 'id'>) => Promise<string>;
  getCaseById: (id: string) => Case | null | undefined;
  addCommentToCase: (caseId: string, comment: CaseConversation) => void;
  deleteCase: (caseId: string) => void;
  selectedCase: Case | null;
  setSelectedCase: (caseData: Case | null) => void;
  fetchAllCases: () => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

const initialCases: Case[] = [];

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [allCases, setAllCases] = useState<Case[]>(() => {
    try {
        if (typeof window === 'undefined') return initialCases;
        const item = window.localStorage.getItem('allCases');
        return item ? JSON.parse(item) : initialCases;
    } catch (error) {
        console.warn("Could not parse allCases from localStorage", error);
        return initialCases;
    }
  }); 
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
        if (typeof window === 'undefined') return;
        const allStoredCases = allCases;
        if (user) {
            const userCases = allStoredCases.filter((c: Case) => c.user?.uid === user.uid);
            setCases(userCases);
        } else {
            setCases([]);
        }
    } catch (error) {
        console.warn("Could not parse cases from localStorage", error);
        setCases(initialCases);
    }
  }, [user, allCases]);

  useEffect(() => {
    try {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem('allCases', JSON.stringify(allCases));
    } catch (error) {
        console.error("Could not save all cases to localStorage", error);
    }
  }, [allCases]);

  const fetchAllCases = () => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem('allCases');
        setAllCases(item ? JSON.parse(item) : []);
      }
    } catch (error) {
        console.warn("Could not parse all cases from localStorage", error);
        setAllCases([]);
    }
  };
  
  const addCase = async (newCaseData: Omit<Case, 'id'>): Promise<string> => {
    const newId = `case_${new Date().getTime()}`;
    const newCaseWithId = { ...newCaseData, id: newId };
    
    setAllCases(prev => [newCaseWithId, ...prev]);

    // Trigger notification in the background
    if (newCaseData.user) {
         notifyAdminOnNewCase({
            caseId: newId,
            caseTitle: newCaseData.title,
            caseCategory: newCaseData.category,
            caseDescription: newCaseData.description,
            userName: newCaseData.user.name || 'N/A',
            userCountry: newCaseData.user.country || 'N/A',
            userPhone: newCaseData.user.phoneNumber || 'N/A',
            evidenceDataUrl: newCaseData.evidence?.url,
            evidenceFileName: newCaseData.evidence?.name,
            evidenceFileType: newCaseData.evidence?.type,
        }).catch(error => {
            // Log the error but don't block the user
            console.error("Failed to send admin notification:", error);
        });
    }

    return newId;
  };

  const getCaseById = (id: string) => {
     return allCases.find(c => c.id === id);
  }

  const addCommentToCase = (caseId: string, comment: CaseConversation) => {
    const updateCaseInList = (list: Case[]) => list.map(c => 
        c.id === caseId ? { ...c, conversation: [...c.conversation, comment] } : c
    );
    setCases(updateCaseInList);
    setAllCases(updateCaseInList);
    if(selectedCase?.id === caseId){
        setSelectedCase(prev => prev ? {...prev, conversation: [...prev.conversation, comment]} : null);
    }
  };

  const deleteCase = (caseId: string) => {
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
