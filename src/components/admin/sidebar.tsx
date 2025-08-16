
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, MessageSquare, Settings, LogOut, ShieldCheck, Home, Star, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Posts", href: "/admin/blog", icon: Newspaper },
  { name: "Comments", href: "/admin/comments", icon: MessageSquare },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Cases", href: "/admin/cases", icon: FileText },
  { name: "User Dashboard", href: "/dashboard", icon: User },
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
    <aside className="w-full flex flex-col h-full">
        <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold tracking-tight text-foreground">
                    DemandHub
                </span>
            </Link>
        </div>

      <div className="p-4 text-sm text-muted-foreground">Admin Panel</div>

      <nav className="flex flex-col gap-2 flex-grow p-4">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
      
      <div className="flex flex-col gap-2 p-4 border-t">
         <Button variant="outline" className="w-full justify-start gap-2" asChild>
           <Link href="/">
            <Home className="h-4 w-4 shrink-0" />
            <span>View Live Site</span>
           </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 shrink-0" />
             <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
