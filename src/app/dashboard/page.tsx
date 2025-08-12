
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { ArrowRight } from "lucide-react";
import { useCases } from "@/context/case-context";
import { useMemo } from "react";
import { useAuth } from "@/context/auth-context";
import { differenceInDays, parseISO } from "date-fns";

export default function DashboardPage() {
  const { cases } = useCases();
  const { user } = useAuth();
  const router = useRouter();

  const openCases = useMemo(() => cases.filter(c => c.status === 'Open'), [cases]);
  const resolvedCases = useMemo(() => cases.filter(c => c.status === 'Closed'), [cases]);

  const daysSinceLastActivity = useMemo(() => {
    if (cases.length === 0) {
      return 0;
    }
    const mostRecentCase = [...cases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    return differenceInDays(new Date(), parseISO(mostRecentCase.date));
  }, [cases]);

  const stats = [
    { value: openCases.length, label: "Open Cases" },
    { value: resolvedCases.length, label: "Resolved Cases" },
    { value: daysSinceLastActivity, label: "Days Since Last Activity", suffix: " days" },
  ];

  const handleViewCase = (caseId: string) => {
    router.push(`/dashboard/case/${caseId.replace('CASE-','')}`);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Hello, {user?.name || 'User'}</h1>
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
              {[...cases].reverse().slice(0,4).map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.id}</TableCell>
                  <TableCell>{caseItem.title}</TableCell>
                  <TableCell>
                    <Badge variant={caseItem.status === 'Open' ? 'destructive' : 'secondary'}>{caseItem.status}</Badge>
                  </TableCell>
                  <TableCell>{caseItem.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleViewCase(caseItem.id)}>
                        View Case
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
