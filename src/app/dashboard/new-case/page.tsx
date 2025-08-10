import { NewCaseForm } from "@/components/dashboard/new-case-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function NewCasePage() {
  return (
     <div>
        <h1 className="text-3xl font-bold mb-1">File a New Case</h1>
        <p className="text-muted-foreground mb-8">Please provide as much detail as possible about your situation.</p>
        <Card>
            <CardHeader>
                <CardTitle>New Case Details</CardTitle>
                <CardDescription>All information submitted is confidential and protected.</CardDescription>
            </CardHeader>
            <CardContent>
                <NewCaseForm />
            </CardContent>
        </Card>
     </div>
  );
}
