
"use client";

import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { CaseProvider } from "@/context/case-context";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

// This is a mock authentication check. In a real app, use middleware or a server-side check.
const isAuthenticated = true; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  if (!isAuthenticated) {
    // In a real app with Next.js middleware, you would redirect.
    // For this example, we'll just show a message.
    return (
      <div className="flex h-screen items-center justify-center">
        <p>You must be signed in to view this page. Redirecting...</p>
      </div>
    );
  }

  return (
    <CaseProvider>
      <div className="flex min-h-screen">
        {isDesktop ? (
          <DashboardSidebar />
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden bg-background">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <DashboardSidebar />
            </SheetContent>
          </Sheet>
        )}
        <main className="flex-1 p-4 sm:p-8 bg-primary/5 md:pl-8">
           {/* Add padding for the mobile menu button */}
           <div className="md:hidden h-12"></div>
          {children}
        </main>
      </div>
    </CaseProvider>
  );
}
