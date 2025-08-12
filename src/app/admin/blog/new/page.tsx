
'use client';

import { BlogPostForm } from '@/components/admin/blog-post-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NewPostPage() {
  return (
     <div>
         <Button variant="ghost" asChild className="mb-4 -ml-4">
            <Link href="/admin/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
            </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-1">Create New Post</h1>
        <p className="text-muted-foreground mb-8">Fill out the form below to publish a new article.</p>
        <Card>
            <CardHeader>
                <CardTitle>New Post Details</CardTitle>
                <CardDescription>The slug will be generated automatically from the title.</CardDescription>
            </CardHeader>
            <CardContent>
                <BlogPostForm />
            </CardContent>
        </Card>
     </div>
  );
}
