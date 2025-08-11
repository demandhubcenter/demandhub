import Link from "next/link";
import { ShieldCheck, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WhatsAppButton } from "../shared/whatsapp-button";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container max-w-7xl py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">DemandHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Digital asset recovery you can trust.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Site Map</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/testimonials" className="text-sm text-muted-foreground hover:text-primary">Testimonials</Link></li>
               <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2">
               <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">File a Complaint</Link></li>
               <li><Link href="/signup" className="text-sm text-muted-foreground hover:text-primary">Join Us Now</Link></li>
               <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Legacy Support Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Stay Updated</h4>
            <p className="mb-2 text-sm text-muted-foreground">Subscribe to our newsletter for scam alerts and recovery tips.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" />
                <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DemandHub. All rights reserved.</p>
        </div>
      </div>
      <WhatsAppButton />
    </footer>
  );
}
