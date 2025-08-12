
'use client';

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCases } from "@/context/case-context";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { type Case, type CaseConversation } from "@/context/case-context";
import { useAuth } from "@/context/auth-context";

// This is required for static export with dynamic routes.
// We return an empty array because we don't want to pre-render any specific case pages.
// The page will be rendered on the client side.
export async function generateStaticParams() {
  return [];
}


// This is the actual component that renders the page content.
// It uses client-side hooks to fetch and display data.
function CaseDetailContent() {
  const params = useParams();
  const id = params.id as string;
  const { getCaseById, addCommentToCase, cases } = useCases();
  const { user } = useAuth();
  const [caseDetails, setCaseDetails] = useState<Case | null | undefined>(undefined);
  const [newComment, setNewComment] = useState("");
  
  useEffect(() => {
    if (id) {
      const details = getCaseById(id);
      setCaseDetails(details);
    }
  }, [id, getCaseById, cases]); // Rerun when cases context updates

  if (caseDetails === undefined) {
    return <div>Loading case details...</div>;
  }
  
  if (!caseDetails) {
    return notFound();
  }
  
  const handleAddComment = () => {
    if (!newComment.trim() || !user || !id) return;
    
    const comment: CaseConversation = {
      author: {
        name: user.name || "Client",
        role: "Client",
        avatar: ""
      },
      timestamp: new Date().toLocaleString(),
      text: newComment,
    };
    
    addCommentToCase(id, comment);
    setNewComment("");
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
                                    <AvatarImage src="" /> 
                                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                                </Avatar>
                             )}
                        </div>
                    ))}
                    <Separator />
                    <div>
                        <Textarea 
                          placeholder="Add a comment or update..." 
                          className="mb-2"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                         />
                        <Button onClick={handleAddComment}>Add Comment</Button>
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
                    <CardTitle>Case Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{caseDetails.category}</p>
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


// The default export remains a simple component that renders the client-side content.
// This structure satisfies the Next.js static export requirements.
export default function CaseDetailPage() {
    return <CaseDetailContent />;
}
