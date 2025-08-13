
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useBlog } from "@/context/blog-context"
import { type BlogPost, initialAuthors } from "@/context/blog-context"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "../ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { RichTextEditor } from "./rich-text-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  authorName: z.string({ required_error: "Please select an author." }),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  tags: z.string().min(1, "Please provide at least one tag, comma-separated."),
  imageSrc: z.string().url("Please provide a valid image URL."),
  imageHint: z.string().min(1, "Please provide an AI hint for the image."),
  date: z.date(),
  featured: z.boolean().default(false),
})

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

interface BlogPostFormProps {
    existingPost?: BlogPost;
}

export function BlogPostForm({ existingPost }: BlogPostFormProps) {
  const { toast } = useToast()
  const router = useRouter();
  const { addPost, updatePost, posts } = useBlog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: existingPost?.title || "",
        excerpt: existingPost?.excerpt || "",
        content: existingPost?.content || "",
        tags: existingPost?.tags.join(", ") || "",
        imageSrc: existingPost?.image.src || "",
        imageHint: existingPost?.image.hint || "",
        date: existingPost ? new Date(existingPost.date) : new Date(),
        featured: existingPost?.featured || false,
        authorName: existingPost?.author.name || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = existingPost?.slug || slugify(values.title);

    if (!existingPost && posts.some(p => p.slug === slug)) {
        toast({
            title: "Error",
            description: "A post with this slug already exists. Please choose a different title.",
            variant: "destructive"
        })
        return;
    }
    
    const authorKey = Object.keys(initialAuthors).find(key => initialAuthors[key as keyof typeof initialAuthors].name === values.authorName);
    const author = authorKey ? initialAuthors[authorKey as keyof typeof initialAuthors] : initialAuthors.alice;


    const postData = {
        slug: slug,
        title: values.title,
        excerpt: values.excerpt,
        content: values.content,
        tags: values.tags.split(',').map(tag => tag.trim()),
        image: { src: values.imageSrc, hint: values.imageHint },
        date: values.date.toISOString(),
        featured: values.featured,
        author: author,
        comments: existingPost?.comments || [],
    };

    if (existingPost) {
        updatePost(slug, postData);
         toast({
            title: "Post Updated!",
            description: `The post "${values.title}" has been successfully updated.`
        });
    } else {
        addPost(postData);
        toast({
            title: "Post Created!",
            description: `The new post "${values.title}" has been successfully created.`
        });
    }
    router.push('/admin/blog');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 'The Rise of AI in Fraud Detection'" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Author</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an author" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {Object.values(initialAuthors).map(author => (
                             <SelectItem key={author.name} value={author.name}>{author.name}</SelectItem>
                           ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
         <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
               <FormControl>
                <Textarea
                  placeholder="A short summary of the post..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <RichTextEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Tags (comma-separated)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., AI, Cybersecurity" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Publication Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
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
                    <Input placeholder="e.g., 'cyber security'" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                />
                </FormControl>
                <div className="space-y-1 leading-none">
                <FormLabel>
                    Featured Post
                </FormLabel>
                <FormDescription>
                    Featured posts appear at the top of the blog page.
                </FormDescription>
                </div>
            </FormItem>
            )}
        />
        <Button type="submit">{existingPost ? 'Update Post' : 'Create Post'}</Button>
      </form>
    </Form>
  )
}
