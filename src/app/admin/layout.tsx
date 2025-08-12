
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminSidebar } from '@/components/admin/sidebar';
import { useMediaQuery } from 'react-responsive';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = useAdminAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = React.useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

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
    <div className="flex min-h-screen">
      {isDesktop ? (
        <AdminSidebar />
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden bg-background">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <AdminSidebar />
          </SheetContent>
        </Sheet>
      )}
      <main className="flex-1 p-4 sm:p-8 bg-primary/5">
          <div className="md:hidden h-12"></div>
          {children}
      </main>
    </div>
  );
}
