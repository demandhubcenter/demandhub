
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, { message: "Please enter your password."}),
})

export function SignInForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isVerified) return;
    setIsLoading(true);
    try {
      await signIn(values.email, values.password);
      router.push('/dashboard');

    } catch (error: any) {
        let errorMessage = "An error occurred during sign in. Please check your credentials.";
        // Firebase specific error codes for bad credentials
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
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
        <div className="flex items-center justify-end">
             <Link href="/forgot-password" passHref>
                <Button variant="link" className="p-0 h-auto text-xs" type="button">Forgot Password?</Button>
            </Link>
        </div>
        
        {/* Simulated reCAPTCHA */}
        <div className="flex items-center space-x-2 rounded-md border border-input p-3 bg-background">
          <Checkbox 
            id="robot-check" 
            onCheckedChange={(checked) => setIsVerified(!!checked)}
            checked={isVerified}
            disabled={isLoading}
          />
          <Label htmlFor="robot-check" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I am not a robot
          </Label>
           <div className="ml-auto text-center">
              <Shield className="h-6 w-6 text-gray-400 mx-auto" />
              <p className="text-xs text-gray-400 mt-1">Protected</p>
           </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || !isVerified}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Form>
  )
}
