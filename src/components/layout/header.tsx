"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            DemandHub
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
           {user && (
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith('/dashboard') ? "text-primary" : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:flex">
              {user ? (
                <Button asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button asChild>
                    <Link href="/signin">Sign In</Link>
                </Button>
              )}
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle menu</span>
            </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 h-[calc(100vh-4rem)] bg-background z-50">
          <div className="container flex flex-col gap-4 pt-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50"
                )}
              >
                {item.name}
              </Link>
            ))}
             {user && (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname.startsWith('/dashboard')
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50"
                )}
              >
                Dashboard
              </Link>
            )}
             <div className="mt-4 border-t pt-4">
                {user ? (
                  <Button asChild className="w-full">
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Go to Dashboard</Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                      <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
