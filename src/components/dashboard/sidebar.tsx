
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Settings, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "My Cases", href: "/dashboard/cases", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
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

      <nav className="flex flex-col gap-2 flex-grow p-4 mt-4">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
