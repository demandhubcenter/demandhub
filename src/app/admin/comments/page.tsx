
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
import { Trash2, Edit } from "lucide-react";
import { useBlog, type PostComment } from "@/context/blog-context";
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
import { useState } from "react";
import { EditCommentDialog } from "@/components/admin/edit-comment-dialog";

// Combine PostComment with post context for the table
export type CommentWithContext = PostComment & {
  postTitle: string;
  postSlug: string;
};

export default function AdminCommentsPage() {
    const { posts, deleteCommentFromPost, updateCommentInPost } = useBlog();
    const { toast } = useToast();
    const [commentToEdit, setCommentToEdit] = useState<CommentWithContext | null>(null);
    const [editingText, setEditingText] = useState("");
    const [editingDate, setEditingDate] = useState("");

    // Flatten comments from all posts
    const allComments: CommentWithContext[] = posts.flatMap(post => 
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
    
    const handleOpenEditDialog = (comment: CommentWithContext) => {
        setCommentToEdit(comment);
        setEditingText(comment.text);
        const localDate = new Date(comment.date);
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
        setEditingDate(`${year}-${month}-${day}T${hours}:${minutes}`);
    }

    const handleSaveComment = () => {
        if (!commentToEdit) return;

        updateCommentInPost(commentToEdit.postSlug, commentToEdit.id, { text: editingText, date: new Date(editingDate).toISOString() });
        toast({
            title: "Comment Updated",
            description: "The comment has been successfully updated.",
        });
        setCommentToEdit(null);
    }
    
    const handleCloseDialog = () => {
        setCommentToEdit(null);
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
                                     <Button 
                                        variant="outline" 
                                        size="icon"
                                        className="h-9 w-9"
                                        onClick={() => handleOpenEditDialog(comment)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
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

            {commentToEdit && (
                <EditCommentDialog
                    isOpen={!!commentToEdit}
                    onClose={handleCloseDialog}
                    onSave={handleSaveComment}
                    text={editingText}
                    date={editingDate}
                    onTextChange={setEditingText}
                    onDateChange={setEditingDate}
                />
            )}
        </div>
    )
}
