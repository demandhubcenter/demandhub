
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, MessageSquare, Settings, LogOut, ShieldCheck, ArrowLeft, Home, Star, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Posts", href: "/admin/blog", icon: Newspaper },
  { name: "Comments", href: "/admin/comments", icon: MessageSquare },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Cases", href: "/admin/cases", icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-background p-6 flex flex-col h-full">
      <Link href="/" className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            DemandHub
          </span>
      </Link>
      <div className="text-sm text-muted-foreground pl-2 mb-6">Admin Panel</div>

      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
      
      <div className="flex flex-col gap-2">
         <Button variant="outline" className="w-full justify-start gap-2" asChild>
           <Link href="/">
            <Home className="h-4 w-4" />
            View Live Site
           </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign Out
        </Button>
      </div>
    </aside>
  );
}
