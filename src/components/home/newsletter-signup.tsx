"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/ai/flows/newsletter-signup-flow";

export function NewsletterSignup() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const result = await subscribeToNewsletter({ email });
      if (result.success) {
        setIsDialogOpen(true);
        setEmail(""); // Reset email input
      } else {
        toast({
            title: "Subscription Failed",
            description: result.message || "An unexpected error occurred.",
            variant: "destructive"
        })
      }
    } catch (error) {
       toast({
            title: "Subscription Failed",
            description: "An unexpected error occurred. Please try again later.",
            variant: "destructive"
        })
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-7xl">
          <Card className="bg-primary text-primary-foreground shadow-lg overflow-hidden">
           <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12">
                <CardHeader className="p-0 text-left">
                  <CardTitle className="text-3xl font-bold">Stay Ahead of Scams</CardTitle>
                  <CardDescription className="text-primary-foreground/80 text-lg mt-2">
                    Subscribe to our newsletter for the latest scam alerts & recovery tips.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-6">
                  <form className="flex flex-col sm:flex-row w-full max-w-lg items-center gap-2" onSubmit={handleSubmit}>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus:ring-accent w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <Button type="submit" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto" disabled={isLoading}>
                      {isLoading ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </form>
                </CardContent>
              </div>
              <div className="hidden md:block h-full bg-accent/20 relative">
                 <div className="absolute inset-0 bg-primary opacity-50"></div>
                 <div 
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&q=80')" }}
                    data-ai-hint="security abstract"
                  ></div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader className="items-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <DialogTitle className="text-2xl">Subscription Successful!</DialogTitle>
            <DialogDescription className="pt-2">
              Thank you for subscribing. You'll receive the latest scam alerts and recovery tips directly in your inbox.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
