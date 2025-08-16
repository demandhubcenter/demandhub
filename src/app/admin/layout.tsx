
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, PanelLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminSidebar } from '@/components/admin/sidebar';
import { TestimonialProvider } from '@/context/testimonial-context';
import { CaseProvider } from '@/context/case-context';
import { BlogProvider } from '@/context/blog-context';
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
                    <AdminSidebar />
                </SheetContent>
            </Sheet>
            <div className="flex-1 text-center">
                <span className="text-lg font-semibold">Admin Panel</span>
            </div>
        </header>
    );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = useAdminAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // A slight delay to ensure auth context is fully loaded
    const timer = setTimeout(() => {
        if (!isAdmin) {
            router.replace('/');
        }
        setAuthChecked(true);
    }, 500); 
    
    return () => clearTimeout(timer);
  }, [isAdmin, router]);


  if (!authChecked) {
    return (
        <div className="container max-w-7xl py-12">
            <div className="space-y-4">
                <Skeleton className="h-10 w-1/4" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-40 w-full" />
            </div>
        </div>
    );
  }
  
  if (!isAdmin) {
     return (
        <div className="container max-w-lg py-20">
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Access Denied</AlertTitle>
                <AlertDescription>
                   You do not have permission to view this page. Redirecting...
                </AlertDescription>
            </Alert>
        </div>
     )
  }

  return (
    <BlogProvider>
      <TestimonialProvider>
        <CaseProvider>
          <div className="flex min-h-screen">
            <aside className="w-64 flex-shrink-0 border-r bg-background p-4 hidden md:flex md:flex-col">
              <AdminSidebar />
            </aside>
            <div className="flex-1 flex flex-col">
                <MobileHeader />
                <main className="flex-1 p-4 sm:p-8 bg-primary/5">
                    {children}
                </main>
            </div>
          </div>
        </CaseProvider>
      </TestimonialProvider>
    </BlogProvider>
  );
}
