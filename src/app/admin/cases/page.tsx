
"use client";

import { useEffect, useCallback } from "react";
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
import { useCases } from "@/context/case-context";
import { useRouter } from "next/navigation";
import { type Case } from "@/context/case-context";
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
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminCasesPage() {
    const { allCases, fetchAllCases, setSelectedCase, deleteCase } = useCases();
    const router = useRouter();
    const { toast } = useToast();

    // Use useCallback to memoize the fetch function
    const memoizedFetchAllCases = useCallback(() => {
        fetchAllCases();
    }, [fetchAllCases]);

    useEffect(() => {
        // Initial fetch when component mounts
        memoizedFetchAllCases();

        // Refetch when the window gains focus
        const handleFocus = () => {
            memoizedFetchAllCases();
        };

        window.addEventListener('focus', handleFocus);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [memoizedFetchAllCases]);

    const handleViewCase = (caseItem: Case) => {
        setSelectedCase(caseItem);
        router.push('/dashboard/submitted-case');
    };

    const handleDeleteCase = async (caseId: string) => {
        try {
            await deleteCase(caseId);
            toast({
                title: "Case Deleted",
                description: `Case with ID ${caseId} has been successfully deleted.`,
            });
        } catch (error) {
             toast({
                title: "Error Deleting Case",
                description: "There was an error deleting the case. Please try again.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">All Cases</h1>
                <p className="text-muted-foreground">A complete list of all cases submitted by users.</p>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Submitted Cases</CardTitle>
                    <CardDescription>Review and manage all active and past cases.</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Case ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Date Opened</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {allCases.map((caseItem) => (
                            <TableRow key={caseItem.id}>
                                <TableCell className="font-medium">{caseItem.id}</TableCell>
                                <TableCell>{caseItem.title}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{caseItem.user?.name || "N/A"}</span>
                                        <span className="text-xs text-muted-foreground">{caseItem.user?.email || "N/A"}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{new Date(caseItem.date).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleViewCase(caseItem)}
                                    >
                                        View Details
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon" className="h-9 w-9">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this case
                                                and remove its data from our servers.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDeleteCase(caseItem.id)}
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
                    {allCases.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No cases have been submitted yet.</p>
                    )}
                </div>
                </CardContent>
            </Card>
        </div>
    )
}
