
"use client"
import Link from "next/link";
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
import { Filter } from "lucide-react";
import { useCases } from "@/context/case-context";


export default function CasesPage() {
    const [filter, setFilter] = useState("All");
    const { cases } = useCases();

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
                            <TableHead></TableHead>
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
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/dashboard/case/${caseItem.id.replace('CASE-','')}`}>View Case</Link>
                                </Button>
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
