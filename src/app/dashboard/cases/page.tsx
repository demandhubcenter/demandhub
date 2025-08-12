
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Filter, Trash2 } from "lucide-react";
import { useCases } from "@/context/case-context";
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


export default function CasesPage() {
    const [filter, setFilter] = useState("All");
    const { cases, deleteCase, setSelectedCase } = useCases();
    const router = useRouter();

    const handleViewCase = (caseItem: any) => {
        setSelectedCase(caseItem);
        router.push('/dashboard/submitted-case');
    };

    const filteredCases = cases.filter(caseItem => {
        if (filter === "All") return true;
        return caseItem.status === filter;
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">My Cases</h1>
                    <p className="text-muted-foreground">Review and manage all your cases here.</p>
                </div>
                 <Button asChild>
                    <Link href="/dashboard/new-case">File New Case</Link>
                </Button>
            </div>

             <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle>All Submitted Cases</CardTitle>
                            <CardDescription>A complete history of your recovery cases with DemandHub.</CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                                    <Filter className="h-4 w-4" /> Filter ({filter})
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setFilter("All")}>All</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilter("Open")}>Open</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilter("Closed")}>Closed</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Case ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date Opened</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {filteredCases.map((caseItem) => (
                            <TableRow key={caseItem.id}>
                            <TableCell className="font-medium">{caseItem.id}</TableCell>
                            <TableCell>{caseItem.title}</TableCell>
                            <TableCell>
                                <Badge variant={caseItem.status === 'Open' ? 'destructive' : 'secondary'}>{caseItem.status}</Badge>
                            </TableCell>
                            <TableCell>{caseItem.date}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleViewCase(caseItem)}
                                >
                                    View
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
                                            onClick={() => deleteCase(caseItem.id)}
                                            className="bg-destructive hover:bg-destructive/90"
                                        >
                                            Continue
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
