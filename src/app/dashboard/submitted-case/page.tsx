
'use client';

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCases } from "@/context/case-context";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type Case, type CaseConversation } from "@/context/case-context";
import { useAuth } from "@/context/auth-context";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function SubmittedCasePage() {
  const { selectedCase, addCommentToCase } = useCases();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    // If there's no selected case, redirect back to the cases list.
    // This can happen if the user refreshes the page.
    if (!selectedCase) {
      router.replace('/dashboard/cases');
    }
  }, [selectedCase, router]);

  // Render nothing or a loading state while redirecting
  if (!selectedCase) {
    return null; 
  }
  
  const handleAddComment = () => {
    if (!newComment.trim() || !user) return;
    
    const comment: CaseConversation = {
      author: {
        name: user.name || "Client",
        role: "Client",
        avatar: ""
      },
      timestamp: new Date().toLocaleString(),
      text: newComment,
    };
    
    addCommentToCase(selectedCase.id, comment);
    setNewComment("");
  }

  const isImage = selectedCase.evidence?.type?.startsWith('image/');

  return (
    <div className="space-y-8">
       <div>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
        </Button>
        <div className="flex items-center gap-4 mb-1">
            <h1 className="text-3xl font-bold">{selectedCase.title}</h1>
        </div>
        <p className="text-muted-foreground">Case ID: {selectedCase.id} | Opened: {selectedCase.date}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Conversation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {selectedCase.conversation.map((entry: any, index: number) => (
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
                    <p className="text-muted-foreground">{selectedCase.description}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Case Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{selectedCase.category}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Attached Evidence</CardTitle>
                </CardHeader>
                 <CardContent>
                    {selectedCase.evidence ? (
                        <div>
                            {isImage ? (
                                <a href={selectedCase.evidence.url} download={selectedCase.evidence.name} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={selectedCase.evidence.url}
                                        alt={selectedCase.evidence.name}
                                        width={500}
                                        height={400}
                                        className="rounded-lg shadow-lg w-full h-auto object-cover"
                                    />
                                </a>
                            ) : (
                                <Button asChild variant="link" className="p-0">
                                    <Link href={selectedCase.evidence.url} download={selectedCase.evidence.name}>
                                        Download: {selectedCase.evidence.name}
                                    </Link>
                                </Button>
                            )}
                        </div>
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

    