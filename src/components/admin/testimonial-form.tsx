
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useTestimonial, type Testimonial } from "@/context/testimonial-context"
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
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  headline: z.string().min(5, "Headline must be at least 5 characters."),
  quote: z.string().min(20, "Quote must be at least 20 characters."),
  tags: z.string().min(1, "Please provide at least one tag, comma-separated."),
  imageSrc: z.string().url("Please provide a valid image URL."),
  imageHint: z.string().min(1, "Please provide an AI hint for the image."),
})

interface TestimonialFormProps {
    existingTestimonial?: Testimonial;
}

export function TestimonialForm({ existingTestimonial }: TestimonialFormProps) {
  const { toast } = useToast()
  const router = useRouter();
  const { addTestimonial, updateTestimonial } = useTestimonial();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        headline: existingTestimonial?.headline || "",
        quote: existingTestimonial?.quote || "",
        tags: existingTestimonial?.tags.join(", ") || "",
        imageSrc: existingTestimonial?.image.src || "",
        imageHint: existingTestimonial?.image.hint || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    const testimonialData = {
        headline: values.headline,
        quote: values.quote,
        tags: values.tags.split(',').map(tag => tag.trim()),
        image: { src: values.imageSrc, hint: values.imageHint },
    };

    if (existingTestimonial) {
        updateTestimonial(existingTestimonial.id, testimonialData);
         toast({
            title: "Testimonial Updated!",
            description: `The testimonial "${values.headline}" has been successfully updated.`
        });
    } else {
        addTestimonial({
            ...testimonialData,
            id: `rec-${new Date().getTime()}`
        });
        toast({
            title: "Testimonial Created!",
            description: `The new testimonial "${values.headline}" has been successfully created.`
        });
    }
    router.push('/admin/testimonials');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
        control={form.control}
        name="headline"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Headline</FormLabel>
            <FormControl>
                <Input placeholder="e.g., 'Recovered $120K from Crypto Scam'" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
         <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote</FormLabel>
               <FormControl>
                <Textarea
                  placeholder="A short quote from the client..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="imageSrc"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://images.unsplash.com/..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="imageHint"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image AI Hint</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 'relieved person'" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Tags (comma-separated)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Crypto, Forensics" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit">{existingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}</Button>
      </form>
    </Form>
  )
}
