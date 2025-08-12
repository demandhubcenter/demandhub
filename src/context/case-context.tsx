
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CaseConversation {
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
  getCaseById: (id: string) => Case | undefined;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

const initialCases: Case[] = [];

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [cases, setCases] = useState<Case[]>(initialCases);

  const addCase = (newCase: Case) => {
    setCases(prevCases => [...prevCases, newCase]);
  };

  const getCaseById = (id: string) => {
    // The ID from the URL might be just '001', but stored as 'CASE-001'.
    // We should handle both formats for robustness.
    const formattedId = id.startsWith('CASE-') ? id : `CASE-${id.padStart(3, '0')}`;
    return cases.find(c => c.id === formattedId);
  }

  return (
    <CaseContext.Provider value={{ cases, addCase, getCaseById }}>
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
