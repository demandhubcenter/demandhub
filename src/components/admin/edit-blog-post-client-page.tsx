
'use client';

import { BlogPostForm } from '@/components/admin/blog-post-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { type BlogPost } from '@/context/blog-context';

export function EditBlogPostClientPage({ post }: { post: BlogPost }) {
  return (
     <div className="space-y-8">
         <Button variant="ghost" asChild className="mb-4 -ml-4">
            <Link href="/admin/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
            </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold mb-1">Edit Post</h1>
            <p className="text-muted-foreground mb-8">Update the details for this article.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Editing: {post.title}</CardTitle>
                <CardDescription>Slug: {post.slug}</CardDescription>
            </CardHeader>
            <CardContent>
                <BlogPostForm existingPost={post} />
            </CardContent>
        </Card>
     </div>
  );
}
