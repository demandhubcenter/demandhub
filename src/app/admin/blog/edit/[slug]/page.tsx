
'use client';

import { BlogPostForm } from '@/components/admin/blog-post-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useBlog } from '@/context/blog-context';
import { notFound } from 'next/navigation';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';


export default function EditPostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = React.use(params);
  const { getPostBySlug, deleteCommentFromPost } = useBlog();
  const post = getPostBySlug(resolvedParams.slug);
  const { toast } = useToast();

  if (!post) {
    notFound();
  }

  const handleDeleteComment = (commentId: string) => {
    deleteCommentFromPost(post.slug, commentId);
    toast({
        title: "Comment Deleted",
        description: "The comment has been successfully removed.",
    })
  }

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

        <Separator />

         <Card>
            <CardHeader>
                <CardTitle>Manage Comments ({post.comments.length})</CardTitle>
                <CardDescription>Review and delete comments for this post.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {post.comments.length === 0 ? (
                    <p className="text-muted-foreground">No comments yet.</p>
                ) : (
                    post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start justify-between gap-4">
                            <div className="flex gap-4">
                                <Avatar>
                                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} data-ai-hint={comment.author.hint} />
                                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2">
                                        <p className="font-semibold">{comment.author.name}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleString()}</p>
                                    </div>
                                    <p className="text-muted-foreground mt-2">{comment.text}</p>
                                </div>
                            </div>
                           <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this comment.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="bg-destructive hover:bg-destructive/90"
                                    >
                                        Delete Comment
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
     </div>
  );
}
