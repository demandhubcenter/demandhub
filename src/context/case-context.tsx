
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
  getCaseById: (id: string) => Case | null | undefined;
  addCommentToCase: (caseId: string, comment: CaseConversation) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

// Start with an empty array. No more mock data.
const initialCases: Case[] = [];

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [cases, setCases] = useState<Case[]>(initialCases);

  const addCase = (newCase: Case) => {
    setCases(prevCases => [...prevCases, newCase]);
  };

  const getCaseById = (id: string) => {
    // Handle both 'CASE-001' and '001' formats
    const foundCase = cases.find(c => c.id === id || c.id.replace('CASE-', '') === id);
    return foundCase || null;
  }

  const addCommentToCase = (caseId: string, comment: CaseConversation) => {
    setCases(prevCases => 
        prevCases.map(c => {
            // Handle both 'CASE-001' and '001' formats
            const caseIdentifier = c.id.replace('CASE-', '');
            if (c.id === caseId || caseIdentifier === caseId) {
                // Create a new conversation array with the new comment
                const updatedConversation = [...c.conversation, comment];
                // Return a new case object with the updated conversation
                return { ...c, conversation: updatedConversation };
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
