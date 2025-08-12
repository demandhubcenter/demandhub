
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  getCaseById: (id: string) => Case | undefined;
  addCommentToCase: (caseId: string, comment: CaseConversation) => void;
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

  const addCommentToCase = (caseId: string, comment: CaseConversation) => {
    setCases(prevCases => 
        prevCases.map(c => {
            if (c.id === caseId) {
                return { ...c, conversation: [...c.conversation, comment] };
            }
            return c;
        })
    )
  }

  return (
    <CaseContext.Provider value={{ cases, addCase, getCaseById, addCommentToCase }}>
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
