
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCases } from "@/context/case-context"
import { useAuth } from "@/context/auth-context"
import { notifyAdminOnNewCase } from "@/ai/flows/notify-admin-flow"
import { collection, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  category: z.string({ required_error: "Please select a category." }),
  description: z.string().min(20, "Please provide a detailed description of at least 20 characters."),
  evidence: z.instanceof(FileList).optional(),
})

// Helper function to read a file as a Base64 Data URL
const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};


export function NewCaseForm() {
  const { toast } = useToast()
  const router = useRouter();
  const { addCase } = useCases();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCaseId, setNewCaseId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        description: "",
        evidence: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({ title: "Error", description: "You must be logged in to file a case.", variant: "destructive"});
        return;
    }
    setIsSubmitting(true);
    
    const newCaseRef = doc(collection(db, "cases"));
    const newId = newCaseRef.id;

    try {
        setNewCaseId(newId);
        
        const submittedFile = values.evidence?.[0];
        let evidenceData;

        if (submittedFile) {
            const evidenceDataUrl = await fileToDataUrl(submittedFile);
            evidenceData = { name: submittedFile.name, url: evidenceDataUrl, type: submittedFile.type };
        }

        const newCasePayload: any = {
            title: values.title,
            date: new Date().toISOString(),
            category: values.category,
            description: values.description,
            conversation: [
                {
                    author: { name: user?.name || "Client", role: 'Client' as const, avatar: "" },
                    timestamp: new Date().toLocaleString(),
                    text: "Case created.",
                }
            ],
            user: {
              name: user.name,
              email: user.email,
              uid: user.uid,
            }
        };
        
        if (evidenceData) {
            newCasePayload.evidence = evidenceData;
        }

        await addCase(newCasePayload, newId);
        
        await notifyAdminOnNewCase({
            caseId: newId,
            caseTitle: values.title,
            caseCategory: values.category,
            caseDescription: values.description,
            userName: user.name || "N/A",
            userCountry: user.country || "N/A",
            userPhone: user.phoneNumber || "N/A",
            ...(evidenceData && {
                evidenceDataUrl: evidenceData.url,
                evidenceFileName: evidenceData.name,
                evidenceFileType: evidenceData.type,
            })
        });

        setIsModalOpen(true);

    } catch (error) {
        console.error("Failed to submit case or send notification", error);
        toast({
            title: "Submission Failed",
            description: "There was an error submitting your case. Please try again.",
            variant: "destructive"
        })
    } finally {
        setIsSubmitting(false);
    }
  }
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    form.reset();
    toast({
        title: "Case Submitted",
        description: `You will receive an email notification shortly. Your new case ID is ${newCaseId}.`
    })
    router.push('/dashboard/cases');
  }

  const fileRef = form.register("evidence");

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Case Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'Lost funds from crypto exchange'" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service related to your case" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="crypto-scam">Cryptocurrency Scam</SelectItem>
                  <SelectItem value="wire-fraud">Wire Fraud</SelectItem>
                  <SelectItem value="ransomware">Ransomware Attack</SelectItem>
                  <SelectItem value="phishing">Phishing Scheme</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe the incident in detail, including dates, amounts, and any other relevant information."
                  className="resize-y min-h-[150px]"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="evidence"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Upload Evidence</FormLabel>
                    <FormControl>
                        <Input type="file" {...fileRef} accept="image/*,.pdf,.doc,.docx,.txt" disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Case"}
        </Button>
      </form>
    </Form>

    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Case Submitted Successfully</AlertDialogTitle>
            <AlertDialogDescription>
                We have received your case details and will begin our initial assessment. You will receive a confirmation email shortly, and a case manager will be in touch within 24 hours. Your case ID is {newCaseId}.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={handleModalClose}>Close</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
