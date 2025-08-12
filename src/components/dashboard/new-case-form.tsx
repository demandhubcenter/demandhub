
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

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  category: z.string({ required_error: "Please select a category." }),
  description: z.string().min(20, "Please provide a detailed description of at least 20 characters."),
  evidence: z.instanceof(FileList).optional(),
})

export function NewCaseForm() {
  const { toast } = useToast()
  const router = useRouter();
  const { addCase, cases } = useCases();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCaseId, setNewCaseId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        description: "",
        evidence: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const nextId = cases.length > 0 ? Math.max(...cases.map(c => parseInt(c.id.split('-')[1]))) + 1 : 1;
    const formattedId = `CASE-${String(nextId).padStart(3, '0')}`;
    setNewCaseId(formattedId);
    
    const submittedFile = values.evidence?.[0];

    const newCase = {
        id: formattedId,
        title: values.title,
        date: new Date().toISOString().split('T')[0],
        category: values.category,
        description: values.description,
        evidence: submittedFile ? { name: submittedFile.name, url: URL.createObjectURL(submittedFile) } : undefined,
        conversation: [
            {
                author: { name: user?.name || "Client", role: 'Client' as const, avatar: "" },
                timestamp: new Date().toLocaleString(),
                text: "Case created.",
            }
        ]
    };
    addCase(newCase);
    
    // Here you would upload the file and submit the case to your backend
    setIsModalOpen(true);
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
                <Input placeholder="e.g., 'Lost funds from crypto exchange'" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        <Input type="file" {...fileRef} accept="image/*,.pdf,.doc,.docx,.txt" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">Submit Case</Button>
      </form>
    </Form>

    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Case Submitted Successfully</AlertDialogTitle>
            <AlertDialogDescription>
                We have received your case details and will begin our initial assessment. You will receive a confirmation email shortly, and a case manager will be in touch within 24 hours. Your case ID is ${newCaseId}.
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
