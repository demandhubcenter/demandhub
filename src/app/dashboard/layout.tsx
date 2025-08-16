
"use client";

import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { CaseProvider } from "@/context/case-context";
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

function MobileHeader() {
    return (
        <header className="md:hidden flex items-center h-14 px-4 border-b bg-background sticky top-0 z-40">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <PanelLeft className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                    <DashboardSidebar />
                </SheetContent>
            </Sheet>
            <div className="flex-1 text-center">
                <span className="text-lg font-semibold">Dashboard</span>
            </div>
        </header>
    );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return (
       <div className="flex min-h-screen">
          {isDesktop && (
            <aside className="w-64 flex-shrink-0 border-r bg-background p-6 flex flex-col h-full">
               <Skeleton className="h-8 w-32 mb-10" />
               <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
               </div>
            </aside>
          )}
          <main className="flex-1 p-4 sm:p-8 bg-primary/5">
             <div className="md:hidden h-12"></div>
             <div className="space-y-8">
                <Skeleton className="h-10 w-64" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
                 <Skeleton className="h-64 w-full" />
             </div>
          </main>
      </div>
    );
  }

  return (
    <CaseProvider>
      <div className="flex min-h-screen">
        <aside className="w-64 flex-shrink-0 border-r bg-background p-4 hidden md:flex md:flex-col">
            <DashboardSidebar />
        </aside>
         <div className="flex-1 flex flex-col">
            <MobileHeader />
            <main className="flex-1 p-4 sm:p-8 bg-primary/5">
                {children}
            </main>
        </div>
      </div>
    </CaseProvider>
  );
}
