
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

const allCases = [
  { id: "CASE-001", title: "Crypto Investment Scam", status: "Open", date: "2023-10-15" },
  { id: "CASE-002", title: "Ransomware Attack", status: "Closed", date: "2023-09-20" },
  { id: "CASE-003", title: "Wire Transfer Fraud", status: "Open", date: "2023-10-28" },
  { id: "CASE-004", title: "E-commerce Phishing", status: "Closed", date: "2023-08-05" },
  { id: "CASE-005", title: "Social Media Account Hack", status: "Closed", date: "2023-07-12" },
  { id: "CASE-006", title: "Fake Invoice Scam", status: "Open", date: "2023-11-01" },
];


export default function CasesPage() {
    const [filter, setFilter] = useState("All");

    const filteredCases = allCases.filter(caseItem => {
        if (filter === "All") return true;
        return caseItem.status === filter;
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
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
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Submitted Cases</CardTitle>
                            <CardDescription>A complete history of your recovery cases with DemandHub.</CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
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
                                <Link href={`/dashboard/case/${caseItem.id}`}>View Case</Link>
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
    )
}
