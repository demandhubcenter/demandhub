
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCases } from "@/context/case-context";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { type Case } from "@/context/case-context";
import { useAuth } from "@/context/auth-context";

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const { getCaseById } = useCases();
  const { user } = useAuth();
  const [caseDetails, setCaseDetails] = useState<Case | null | undefined>(undefined);
  
  useEffect(() => {
    const details = getCaseById(params.id);
    setCaseDetails(details);
  }, [params.id, getCaseById]);

  if (caseDetails === undefined) {
    // Loading state
    return <div>Loading case details...</div>;
  }
  
  if (!caseDetails) {
    // If after loading, case is not found
    return notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-1">
            <h1 className="text-3xl font-bold">{caseDetails.title}</h1>
            <Badge variant={caseDetails.status === 'Open' ? 'destructive' : 'secondary'}>{caseDetails.status}</Badge>
        </div>
        <p className="text-muted-foreground">Case ID: {caseDetails.id} | Opened: {caseDetails.date}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Conversation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {caseDetails.conversation.map((entry: any, index: number) => (
                        <div key={index} className={`flex gap-4 ${entry.author.role === 'Client' ? 'justify-end' : ''}`}>
                             {entry.author.role !== 'Client' && (
                                <Avatar>
                                    <AvatarImage src={entry.author.avatar} />
                                    <AvatarFallback>{entry.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                             )}
                             <div className={`w-3/4 rounded-lg p-4 ${entry.author.role === 'Client' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <div className="flex justify-between items-baseline">
                                     <p className="font-semibold text-sm">{entry.author.name}</p>
                                     <p className="text-xs opacity-70">{entry.timestamp}</p>
                                </div>
                                <p className="mt-2 text-sm">{entry.text}</p>
                             </div>
                              {entry.author.role === 'Client' && (
                                <Avatar>
                                     {/* In a real app, you'd have user avatar URLs */}
                                    <AvatarImage src="" /> 
                                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                                </Avatar>
                             )}
                        </div>
                    ))}
                    <Separator />
                    <div>
                        <Textarea placeholder="Add a comment or update..." className="mb-2" />
                        <Button>Add Comment</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Case Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{caseDetails.description}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Attached Evidence</CardTitle>
                </CardHeader>
                 <CardContent>
                    {caseDetails.evidence ? (
                         <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <Link href={caseDetails.evidence.url} className="text-primary hover:underline" download={caseDetails.evidence.name}>
                                    {caseDetails.evidence.name}
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No evidence attached.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
