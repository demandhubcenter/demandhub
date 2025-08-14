
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/admin-auth-context';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * AdminPage component
 * 
 * This component serves as the main entry point for the admin section.
 * It checks for admin authentication and redirects to the primary admin
 * page (/admin/blog) if the user is authenticated.
 * 
 * This prevents a 404 error when a user navigates directly to the /admin route.
 */
export default function AdminPage() {
  const router = useRouter();
  const { isAdmin } = useAdminAuth();

  useEffect(() => {
    // Redirect to the main admin dashboard page if the user is an admin.
    if (isAdmin) {
      router.replace('/admin/blog');
    }
  }, [isAdmin, router]);

  // Display a loading skeleton while the authentication check is in progress.
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-6 w-1/2 mt-2" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
