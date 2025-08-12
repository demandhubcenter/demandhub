
'use client';

import { BlogPostForm } from '@/components/admin/blog-post-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useBlog } from '@/context/blog-context';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [];
}

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const { getPostBySlug } = useBlog();
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
     <div>
         <Button variant="ghost" asChild className="mb-4 -ml-4">
            <Link href="/admin/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
            </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-1">Edit Post</h1>
        <p className="text-muted-foreground mb-8">Update the details for this article.</p>
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
