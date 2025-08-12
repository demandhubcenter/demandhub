
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Case {
  id: string;
  title: string;
  status: 'Open' | 'Closed';
  date: string;
}

interface CaseContextType {
  cases: Case[];
  addCase: (newCase: Case) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

// Start with an empty array for user-specific cases
const initialCases: Case[] = [];

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [cases, setCases] = useState<Case[]>(initialCases);

  const addCase = (newCase: Case) => {
    setCases(prevCases => [...prevCases, newCase]);
  };

  return (
    <CaseContext.Provider value={{ cases, addCase }}>
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
