
import Link from "next/link";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Filter, ArrowRight } from "lucide-react";

const stats = [
  { value: 2, label: "Open Cases" },
  { value: 18, label: "Resolved Cases" },
  { value: 2, label: "Days Since Last Activity", suffix: " days" },
];

const cases = [
  { id: "CASE-001", title: "Crypto Investment Scam", status: "Open", date: "2023-10-15" },
  { id: "CASE-003", title: "Wire Transfer Fraud", status: "Open", date: "2023-10-28" },
  { id: "CASE-002", title: "Ransomware Attack", status: "Closed", date: "2023-09-20" },
  { id: "CASE-004", title: "E-commerce Phishing", status: "Closed", date: "2023-08-05" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Hello, John Doe</h1>
        <p className="text-muted-foreground">Welcome back to your DemandHub dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm font-medium">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                <AnimatedCounter to={stat.value} />
                {stat.suffix}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                 <CardTitle>Recent Cases</CardTitle>
                 <p className="text-sm text-muted-foreground">A snapshot of your most recent cases.</p>
            </div>
            <div className="flex items-center gap-2">
                 <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/cases">
                        View All Cases <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                 </Button>
                <Button asChild>
                    <Link href="/dashboard/new-case">File New Case</Link>
                </Button>
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
              {cases.slice(0,4).map((caseItem) => (
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
  );
}
