
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

const initialCases: Case[] = [
  { id: "CASE-001", title: "Crypto Investment Scam", status: "Open", date: "2023-10-15" },
  { id: "CASE-002", title: "Ransomware Attack", status: "Closed", date: "2023-09-20" },
  { id: "CASE-003", title: "Wire Transfer Fraud", status: "Open", date: "2023-10-28" },
  { id: "CASE-004", title: "E-commerce Phishing", status: "Closed", date: "2023-08-05" },
];

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
