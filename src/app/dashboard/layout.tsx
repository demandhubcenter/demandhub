
"use client";

import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { CaseProvider } from "@/context/case-context";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';


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
        <main className="flex-1 p-4 sm:p-8 bg-primary/5">
           {/* Add padding for the mobile menu button */}
           <div className="md:hidden h-12"></div>
          {children}
        </main>
      </div>
    </CaseProvider>
  );
}
