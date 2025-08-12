
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { auth } from "@/lib/firebase"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, { message: "Please enter your password."}),
})

export function SignInForm() {
  const { signIn, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const user = await signIn(values.email, values.password);

      // It's crucial to check for email verification AFTER a successful sign-in
      // because Firebase might need to refresh the user's state.
      // We reload the user state to get the latest emailVerified status.
      await user.reload();
      
      if (user.emailVerified) {
        router.push('/dashboard');
      } else {
        toast({
          title: "Email Not Verified",
          description: "Please check your email and click the verification link before signing in.",
          variant: "destructive",
        });
        // We log the user out to prevent them from accessing protected routes
        // and redirect them to the verification page.
        await signOut();
        router.push('/verify-email');
      }

    } catch (error: any) {
        let errorMessage = "An error occurred during sign in. Please check your credentials.";
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            errorMessage = "Invalid email or password. Please try again.";
        }
        toast({
            title: "Sign In Failed",
            description: errorMessage,
            variant: "destructive",
        })
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} disabled={isLoading}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
                reCAPTCHA placeholder
            </div>
             <Link href="/forgot-password" passHref>
                <Button variant="link" className="p-0 h-auto text-xs">Forgot Password?</Button>
            </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Form>
  )
}
