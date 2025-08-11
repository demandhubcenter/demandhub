"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MailCheck } from "lucide-react";
import { resendVerificationEmail } from "@/ai/flows/resend-verification-flow";
import { useState } from "react";

export default function VerifyEmailPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);
    try {
        // In a real app, you might get the user's email from the session or context
        await resendVerificationEmail({ email: 'user@example.com' });
        toast({
            title: "Link Sent",
            description: "A new verification link has been sent to your email address.",
        });
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to resend verification link. Please try again later.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
             <MailCheck className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address. Please check your inbox (and spam folder) to complete your registration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Didn't receive the email?
          </p>
          <Button variant="link" onClick={handleResend} className="mt-2" disabled={isLoading}>
            {isLoading ? "Sending..." : "Resend Verification Link"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
