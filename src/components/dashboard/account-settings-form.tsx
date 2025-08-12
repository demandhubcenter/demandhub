
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { countries } from "@/lib/countries";
import Image from "next/image";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  country: z.string({ required_error: "Please select a country."}),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Please enter your current password."),
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"]
});

export function AccountSettingsForm() {
    const { toast } = useToast();
    const { user, updateUser } = useAuth();
    const [isProfileSaving, setIsProfileSaving] = useState(false);
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);

    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: user?.name || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
            country: user?.country || "",
        },
    });

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    })

    async function onProfileSubmit(values: z.infer<typeof profileSchema>) {
        if (!auth.currentUser) return;
        setIsProfileSaving(true);
        try {
            const profileData = {
              displayName: values.fullName,
              photoURL: JSON.stringify({ country: values.country, phoneNumber: values.phoneNumber }),
            }
            await updateProfile(auth.currentUser, profileData);
            
            updateUser({
                name: values.fullName,
                country: values.country,
                phoneNumber: values.phoneNumber
            });
            
            toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });

        } catch (error: any) {
             toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setIsProfileSaving(false);
        }
    }

    async function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
        if (!auth.currentUser || !auth.currentUser.email) return;
        setIsPasswordSaving(true);
        try {
            const credential = EmailAuthProvider.credential(auth.currentUser.email, values.currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, values.newPassword);
            toast({ title: "Password Updated", description: "Your password has been changed successfully." });
            passwordForm.reset();
        } catch (error: any) {
            toast({ title: "Error", description: "Failed to change password. Please check your current password.", variant: "destructive" });
        } finally {
            setIsPasswordSaving(false);
        }
    }


  return (
    <div className="space-y-8">
        <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <FormField
                control={profileForm.control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} disabled={isProfileSaving} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                  control={profileForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isProfileSaving}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-60">
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                               <div className="flex items-center gap-2">
                                <Image src={country.flag} alt={country.name} width={18} height={12} />
                                <span>{country.name} ({country.dial_code})</span>
                               </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="e.g. 2025550125" {...field} disabled={isProfileSaving} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isProfileSaving}>{isProfileSaving ? "Saving..." : "Save Profile"}</Button>
            </form>
        </Form>

        <Separator />

         <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} disabled={isPasswordSaving} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} disabled={isPasswordSaving}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} disabled={isPasswordSaving}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isPasswordSaving}>{isPasswordSaving ? "Saving..." : "Change Password"}</Button>
            </form>
        </Form>
    </div>
  );
}
