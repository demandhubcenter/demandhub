
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
  }
}

interface CaseContextType {
  cases: Case[];
  allCases: Case[]; // For admin view
  addCase: (newCase: Case) => void;
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
  const [allCases, setAllCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // Effect to load/clear cases based on user auth state
  useEffect(() => {
    if (user?.uid) {
      try {
        const item = window.localStorage.getItem(`cases_${user.uid}`);
        setCases(item ? JSON.parse(item) : initialCases);
      } catch (error) {
        console.warn("Could not parse cases from localStorage", error);
        setCases(initialCases);
      }
    } else {
      // If no user, clear the cases
      setCases(initialCases);
      setSelectedCase(null);
    }
  }, [user]);

  // Effect to save cases to localStorage when they change for a specific user
  useEffect(() => {
    if (user?.uid) {
        try {
            window.localStorage.setItem(`cases_${user.uid}`, JSON.stringify(cases));
        } catch (error) {
            console.error("Could not save cases to localStorage", error);
        }
    }
  }, [cases, user]);

  const fetchAllCases = useCallback(() => {
    try {
        if (typeof window !== 'undefined') {
            const allCasesItem = window.localStorage.getItem('all_cases');
            setAllCases(allCasesItem ? JSON.parse(allCasesItem) : []);
        }
    } catch (error) {
        console.warn("Could not parse all_cases from localStorage", error);
        setAllCases([]);
    }
  }, []);

  // Effect to load all cases for admin on initial mount
  useEffect(() => {
    fetchAllCases();
  }, [fetchAllCases]);

  const addCase = (newCase: Case) => {
    setCases(prevCases => [...prevCases, newCase]);

    // Add to global list for admin
    try {
        if (typeof window !== 'undefined') {
            const currentAllCases = JSON.parse(window.localStorage.getItem('all_cases') || '[]');
            const updatedAllCases = [...currentAllCases, newCase];
            window.localStorage.setItem('all_cases', JSON.stringify(updatedAllCases));
            setAllCases(updatedAllCases); // Update state for admin if they are the one adding
        }
    } catch(error) {
        console.error("Could not update all_cases in localStorage", error);
    }
  };

  const getCaseById = (id: string) => {
    // Handle both 'CASE-001' and '001' formats
    const allCasesForSearch = [...cases, ...allCases];
    const uniqueCases = Array.from(new Set(allCasesForSearch.map(c => c.id))).map(id => allCasesForSearch.find(c => c.id === id));
    const foundCase = uniqueCases.find(c => c && (c.id === id || c.id.replace('CASE-', '') === id));
    return foundCase || null;
  }

  const addCommentToCase = (caseId: string, comment: CaseConversation) => {
    const updateCaseList = (caseList: Case[]) => 
        caseList.map(c => {
            if (c.id === caseId) {
                const updatedConversation = [...c.conversation, comment];
                return { ...c, conversation: updatedConversation };
            }
            return c;
        });

    setCases(updateCaseList);
    setAllCases(updateCaseList);
    
    // Update the selected case if it's the one being commented on
    setSelectedCase(prevSelected => 
        prevSelected && prevSelected.id === caseId 
            ? { ...prevSelected, conversation: [...prevSelected.conversation, comment] } 
            : prevSelected
    );

    // Update localStorage for both all_cases and the specific user's cases
    const all_cases = JSON.parse(window.localStorage.getItem('all_cases') || '[]');
    const targetCase = all_cases.find((c: Case) => c.id === caseId);
    
    if (targetCase && targetCase.user?.uid) {
        const userCases = JSON.parse(window.localStorage.getItem(`cases_${targetCase.user.uid}`) || '[]');
        const updatedUserCases = updateCaseList(userCases);
        window.localStorage.setItem(`cases_${targetCase.user.uid}`, JSON.stringify(updatedUserCases));
    }
    
    const updated_all_cases = updateCaseList(all_cases);
    window.localStorage.setItem('all_cases', JSON.stringify(updated_all_cases));
  };


  const deleteCase = (caseId: string) => {
    const caseToDelete = allCases.find(c => c.id === caseId);

    // Remove from local state
    setCases(prevCases => prevCases.filter(c => c.id !== caseId));
    setAllCases(prevCases => prevCases.filter(c => c.id !== caseId));

    // Remove from user-specific storage
    if (caseToDelete && caseToDelete.user?.uid) {
      const userCases = JSON.parse(window.localStorage.getItem(`cases_${caseToDelete.user.uid}`) || '[]');
      const updatedUserCases = userCases.filter((c: Case) => c.id !== caseId);
      window.localStorage.setItem(`cases_${caseToDelete.user.uid}`, JSON.stringify(updatedUserCases));
    }

    // Remove from global storage
     const all_cases = JSON.parse(window.localStorage.getItem('all_cases') || '[]');
     const updated_all_cases = all_cases.filter((c: Case) => c.id !== caseId);
     window.localStorage.setItem('all_cases', JSON.stringify(updated_all_cases));
  }

  return (
    <CaseContext.Provider value={{ cases, allCases, fetchAllCases, addCase, getCaseById, addCommentToCase, deleteCase, selectedCase, setSelectedCase }}>
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

    