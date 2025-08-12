
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";


export default function AdminBlogPage() {
    const { posts, deletePost } = useBlog();
    const router = useRouter();

    const handleEdit = (slug: string) => {
        router.push(`/admin/blog/edit/${slug}`);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Blog Management</h1>
                    <p className="text-muted-foreground">Create, edit, and delete blog posts.</p>
                </div>
                 <Button asChild>
                    <Link href="/admin/blog/new">Create New Post</Link>
                </Button>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>All Blog Posts</CardTitle>
                    <CardDescription>A complete list of all articles on the site.</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                             <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.slug}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell>{post.author.name}</TableCell>
                            <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                                {post.featured && <Badge>Yes</Badge>}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button 
                                    variant="outline" 
                                    size="icon"
                                    className="h-9 w-9"
                                    onClick={() => handleEdit(post.slug)}
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
                                            This action cannot be undone. This will permanently delete this post.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => deletePost(post.slug)}
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
                </div>
                </CardContent>
            </Card>
        </div>
    )
}
