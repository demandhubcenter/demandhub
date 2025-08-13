
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, MessageSquare, Settings, LogOut, ShieldCheck, ArrowLeft, Home, Star, FileText, User, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

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
  const { state } = useSidebar();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  }

  return (
    <aside className="w-full flex-shrink-0 border-r bg-background p-2 flex flex-col h-full">
        <div className="flex items-center justify-between p-2">
            <div className={`flex items-center gap-2 overflow-hidden ${state === 'collapsed' ? 'w-0' : 'w-auto'}`}>
                <Link href="/" className="flex items-center gap-2">
                    <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        DemandHub
                    </span>
                </Link>
            </div>
            <SidebarTrigger>
                <PanelLeft/>
            </SidebarTrigger>
        </div>

      <div className={`text-sm text-muted-foreground pl-4 mt-4 mb-2 ${state === 'collapsed' ? 'hidden' : 'block'}`}>Admin Panel</div>

      <nav className="flex flex-col gap-2 flex-grow p-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
              className={`w-full justify-start gap-2 ${state === 'collapsed' ? 'px-2' : ''}`}
              title={state === 'collapsed' ? item.name : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className={state === 'collapsed' ? 'hidden' : 'block'}>{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
      
      <div className="flex flex-col gap-2 p-2">
         <Button variant="outline" className="w-full justify-start gap-2" asChild>
           <Link href="/">
            <Home className="h-4 w-4 shrink-0" />
            <span className={state === 'collapsed' ? 'hidden' : 'block'}>View Live Site</span>
           </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 shrink-0" />
             <span className={state === 'collapsed' ? 'hidden' : 'block'}>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
