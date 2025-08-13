
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types
export interface Testimonial {
    id: string;
    headline: string;
    quote: string;
    tags: string[];
    image: { src: string; hint: string };
}

interface TestimonialContextType {
    testimonials: Testimonial[];
    getTestimonialById: (id: string) => Testimonial | undefined;
    addTestimonial: (testimonial: Testimonial) => void;
    updateTestimonial: (id: string, testimonialData: Partial<Testimonial>) => void;
    deleteTestimonial: (id: string) => void;
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined);

// Initial Static Data
const initialTestimonials: Testimonial[] = [
  {
    id: 'rec-1',
    image: { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&q=80&fit=crop", hint: "relieved person computer" },
    headline: "Recovered $120K from Crypto Investment Scam",
    quote: "I thought my retirement savings were gone forever. DemandHub's forensic team traced the transactions and recovered almost everything.",
    tags: ["Crypto", "Forensics"],
  },
  {
    id: 'rec-2',
    image: { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&q=80&fit=crop", hint: "business owner" },
    headline: "Saved a Small Business from Ransomware Attack",
    quote: "Our operations were halted. DemandHub not only helped us regain access without paying the ransom but also fortified our systems.",
    tags: ["Ransomware", "Cybersecurity"],
  },
  {
    id: 'rec-3',
    image: { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&q=80&fit=crop", hint: "professional on phone" },
    headline: "Intercepted Fraudulent Wire Transfer of $500K",
    quote: "Their rapid response team worked with banks to freeze the wire transfer mid-transit. It was incredible.",
    tags: ["Wire Fraud", "Crisis Management"],
  },
  {
    id: 'rec-4',
    image: { src: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&q=80&fit=crop", hint: "secure online shopping" },
    headline: "Uncovered an E-commerce Phishing Ring",
    quote: "We were losing customer trust. They identified the source of the phishing attacks and helped us secure our platform.",
    tags: ["Phishing", "E-commerce"],
  },
  {
    id: 'rec-5',
    image: { src: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600&h=400&q=80&fit=crop", hint: "happy couple home" },
    headline: "Recovered a Down Payment from Real Estate Scam",
    quote: "A sophisticated scam nearly cost us our dream home. DemandHub's expertise made all the difference.",
    tags: ["Real Estate", "Individual Recovery"],
  },
  {
    id: 'rec-6',
    image: { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlX92i4bneODDgD15M8Xir-G8vOvweCEkZFQ&s", hint: "digital art" },
    headline: "Traced and Recovered Stolen NFT Collection",
    quote: "My valuable digital art was stolen from my wallet. Their on-chain analysis was key to getting it back.",
    tags: ["NFT", "Blockchain"],
  },
];


export const TestimonialProvider = ({ children }: { children: ReactNode }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
        if (typeof window === 'undefined') return initialTestimonials;
        const item = window.localStorage.getItem('testimonials');
        return item ? JSON.parse(item) : initialTestimonials;
    } catch (error) {
        console.warn("Could not parse testimonials from localStorage", error);
        return initialTestimonials;
    }
  });

  useEffect(() => {
    try {
        window.localStorage.setItem('testimonials', JSON.stringify(testimonials));
    } catch (error) {
        console.error("Could not save testimonials to localStorage", error);
    }
  }, [testimonials]);

  const getTestimonialById = (id: string) => {
    return testimonials.find(t => t.id === id);
  };

  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => [testimonial, ...prev]);
  };

  const updateTestimonial = (id: string, testimonialData: Partial<Testimonial>) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, ...testimonialData } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };
  
  const value = { testimonials, getTestimonialById, addTestimonial, updateTestimonial, deleteTestimonial };

  return <TestimonialContext.Provider value={value}>{children}</TestimonialContext.Provider>;
};

export const useTestimonial = (): TestimonialContextType => {
  const context = useContext(TestimonialContext);
  if (context === undefined) {
    throw new Error('useTestimonial must be used within a TestimonialProvider');
  }
  return context;
};
