
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
import { Trash2, Edit, PlusCircle, Star } from "lucide-react";
import { useTestimonial } from "@/context/testimonial-context";
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
import Image from "next/image";


export default function AdminTestimonialsPage() {
    const { testimonials, deleteTestimonial } = useTestimonial();
    const router = useRouter();

    const handleEdit = (id: string) => {
        router.push(`/admin/testimonials/edit/${id}`);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Testimonials</h1>
                    <p className="text-muted-foreground">Manage client success stories.</p>
                </div>
                 <Button asChild>
                    <Link href="/admin/testimonials/new">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add New Testimonial
                    </Link>
                </Button>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>All Testimonials</CardTitle>
                    <CardDescription>A list of all success stories on the site.</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Headline</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {testimonials.map((item) => (
                            <TableRow key={item.id}>
                            <TableCell>
                                <Image src={item.image.src} alt={item.headline} width={60} height={40} className="rounded-md object-cover"/>
                            </TableCell>
                            <TableCell className="font-medium">{item.headline}</TableCell>
                            <TableCell>
                               <div className="flex gap-1">
                                 {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                               </div>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button 
                                    variant="outline" 
                                    size="icon"
                                    className="h-9 w-9"
                                    onClick={() => handleEdit(item.id)}
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
                                            This action cannot be undone. This will permanently delete this testimonial.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => deleteTestimonial(item.id)}
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
