
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminSidebar } from '@/components/admin/sidebar';
import { TestimonialProvider } from '@/context/testimonial-context';
import { CaseProvider } from '@/context/case-context';
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = useAdminAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = React.useState(false);

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
     <SidebarProvider>
      <TestimonialProvider>
        <CaseProvider>
           <div className="flex">
            <Sidebar side="left">
              <AdminSidebar />
            </Sidebar>
            <main className="flex-1 p-4 sm:p-8 bg-primary/5 min-h-screen">
              {children}
            </main>
           </div>
        </CaseProvider>
      </TestimonialProvider>
    </SidebarProvider>
  );
}
