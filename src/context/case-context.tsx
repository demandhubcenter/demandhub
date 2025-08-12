
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CaseConversation {
    author: { name: string; role: 'Client' | 'Support Agent'; avatar: string };
    timestamp: string;
    text: string;
}

export interface Case {
  id: string;
  title: string;
  status: 'Open' | 'Closed';
  date: string;
  category: string;
  description: string;
  conversation: CaseConversation[];
  evidence?: {
    name: string;
    url: string;
  };
}

interface CaseContextType {
  cases: Case[];
  addCase: (newCase: Case) => void;
  getCaseById: (id: string) => Case | null | undefined;
  addCommentToCase: (caseId: string, comment: CaseConversation) => void;
  deleteCase: (caseId: string) => void;
  selectedCase: Case | null;
  setSelectedCase: (caseData: Case | null) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

const initialCases: Case[] = [];

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [cases, setCases] = useState<Case[]>(() => {
    // On initial load, try to get cases from localStorage
    try {
        const item = window.localStorage.getItem('cases');
        return item ? JSON.parse(item) : initialCases;
    } catch (error) {
        console.warn("Could not parse cases from localStorage", error);
        return initialCases;
    }
  });

  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // When cases change, save them to localStorage
  useEffect(() => {
    try {
        window.localStorage.setItem('cases', JSON.stringify(cases));
    } catch (error) {
        console.error("Could not save cases to localStorage", error);
    }
  }, [cases]);

  const addCase = (newCase: Case) => {
    setCases(prevCases => [...prevCases, newCase]);
  };

  const getCaseById = (id: string) => {
    // Handle both 'CASE-001' and '001' formats
    const foundCase = cases.find(c => c.id === id || c.id.replace('CASE-', '') === id);
    return foundCase || null;
  }

  const addCommentToCase = (caseId: string, comment: CaseConversation) => {
    const updatedCase = (caseToUpdate: Case | null) => {
        if (!caseToUpdate) return null;
        const updatedConversation = [...caseToUpdate.conversation, comment];
        return { ...caseToUpdate, conversation: updatedConversation };
    }

    setCases(prevCases => 
        prevCases.map(c => {
            const caseIdentifier = c.id.replace('CASE-', '');
            if (c.id === caseId || caseIdentifier === caseId) {
                return updatedCase(c)!;
            }
            return c;
        })
    );

    setSelectedCase(prevSelected => updatedCase(prevSelected));
  }

  const deleteCase = (caseId: string) => {
    setCases(prevCases => prevCases.filter(c => c.id !== caseId));
  }

  return (
    <CaseContext.Provider value={{ cases, addCase, getCaseById, addCommentToCase, deleteCase, selectedCase, setSelectedCase }}>
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
