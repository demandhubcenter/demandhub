
"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useBlog } from "@/context/blog-context";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";


export default function AdminCommentsPage() {
    const { posts, deleteCommentFromPost } = useBlog();
    const { toast } = useToast();

    // Flatten comments from all posts
    const allComments = posts.flatMap(post => 
        post.comments.map(comment => ({
            ...comment,
            postTitle: post.title,
            postSlug: post.slug,
        }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    const handleDeleteComment = (slug: string, commentId: string) => {
        deleteCommentFromPost(slug, commentId);
        toast({
            title: "Comment Deleted",
            description: "The comment has been successfully removed.",
        })
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Comment Moderation</h1>
                <p className="text-muted-foreground">Review and manage all comments across all blog posts.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Comments</CardTitle>
                    <CardDescription>A chronological list of all comments submitted on the site.</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Comment</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>In Response To</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {allComments.map((comment, index) => (
                            <TableRow key={`${comment.postSlug}-${comment.id}-${index}`}>
                                <TableCell>
                                    <div className="flex items-start gap-3">
                                         <Avatar className="w-8 h-8">
                                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} data-ai-hint={comment.author.hint} />
                                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-muted-foreground text-sm line-clamp-3">{comment.text}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{comment.author.name}</TableCell>
                                <TableCell>
                                    <Link href={`/blog/${comment.postSlug}`} className="text-primary hover:underline" target="_blank">
                                        {comment.postTitle}
                                    </Link>
                                </TableCell>
                                <TableCell>{new Date(comment.date).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon" className="h-9 w-9">
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
                                                onClick={() => handleDeleteComment(comment.postSlug, comment.id)}
                                                className="bg-destructive hover:bg-destructive/90"
                                            >
                                                Delete
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    {allComments.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No comments found.</p>
                    )}
                </div>
                </CardContent>
            </Card>
        </div>
    )
}
