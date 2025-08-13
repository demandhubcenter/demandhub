

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './auth-context';

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
  const [cases, setCases] = useState<Case[]>(() => {
    try {
      if (typeof window === 'undefined') return initialCases;
      const item = window.localStorage.getItem('userCases');
      return item ? JSON.parse(item) : initialCases;
    } catch (error) {
      console.warn("Could not parse cases from localStorage", error);
      return initialCases;
    }
  });
  const [allCases, setAllCases] = useState<Case[]>(cases); // For admin, starts with all local cases
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
        // This simple setup assumes one user per browser.
        // A real multi-user app would filter by user ID if storing all cases locally.
        window.localStorage.setItem('userCases', JSON.stringify(cases));
    } catch (error) {
        console.error("Could not save cases to localStorage", error);
    }
  }, [cases]);


  const fetchAllCases = () => {
    // In this localStorage model, allCases is just a copy of cases.
    setAllCases(cases);
  };
  
  const addCase = async (newCaseData: Omit<Case, 'id'>): Promise<string> => {
    const newId = `case_${new Date().getTime()}`;
    const newCaseWithId = { ...newCaseData, id: newId };

    setCases(prev => [newCaseWithId, ...prev]);
    // Also update allCases for admin view
    setAllCases(prev => [newCaseWithId, ...prev]);
    return newId;
  };

  const getCaseById = (id: string) => {
     return cases.find(c => c.id === id);
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
