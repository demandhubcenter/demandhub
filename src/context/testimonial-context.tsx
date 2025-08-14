
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { initialTestimonials, type Testimonial } from '@/lib/initial-data';


interface TestimonialContextType {
    testimonials: Testimonial[];
    getTestimonialById: (id: string) => Testimonial | undefined;
    addTestimonial: (testimonial: Testimonial) => void;
    updateTestimonial: (id: string, testimonialData: Partial<Testimonial>) => void;
    deleteTestimonial: (id: string) => void;
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined);

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
