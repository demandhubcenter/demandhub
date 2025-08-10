import { DashboardSidebar } from "@/components/dashboard/sidebar";

// This is a mock authentication check. In a real app, use middleware or a server-side check.
const isAuthenticated = true; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8 bg-primary/5">
        {children}
      </main>
    </div>
  );
}
