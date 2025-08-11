import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Mock data for a single case
const caseDetails = {
  id: "CASE-001",
  title: "Crypto Investment Scam",
  status: "Open",
  dateOpened: "2023-10-15",
  category: "Cryptocurrency Scam",
  description: "I was contacted on Telegram by someone offering a 'guaranteed' investment opportunity. They directed me to a convincing but fake exchange website where I deposited $15,000 in BTC. After the 'investment period', I was unable to withdraw my funds and the contact disappeared. I have screenshots of the conversation and the transaction ID.",
  conversation: [
    {
      author: { name: "John Doe", role: "Client", avatar: "https://placehold.co/100x100.png" },
      timestamp: "2023-10-15 10:30 AM",
      text: "I've uploaded the initial evidence. Please let me know if you need anything else.",
    },
    {
      author: { name: "Diana Prince", role: "Support Agent", avatar: "https://placehold.co/100x100.png" },
      timestamp: "2023-10-15 11:15 AM",
      text: "Thank you, John. We have received the evidence. Our forensics team is beginning the on-chain analysis. We will provide an update within 48 hours.",
    },
    {
      author: { name: "John Doe", role: "Client", avatar: "https://placehold.co/100x100.png" },
      timestamp: "2023-10-17 02:45 PM",
      text: "Just checking in for any updates. I'm very anxious about this.",
    },
     {
      author: { name: "Diana Prince", role: "Support Agent", avatar: "https://placehold.co/100x100.png" },
      timestamp: "2023-10-17 03:00 PM",
      text: "Hi John, we understand completely. We've successfully traced the initial movement of funds to a larger, known fraudulent wallet cluster. This is a positive step. We are now preparing to engage with the relevant exchanges. Please bear with us.",
    },
  ],
};


export default function CaseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-1">
            <h1 className="text-3xl font-bold">{caseDetails.title}</h1>
            <Badge variant={caseDetails.status === 'Open' ? 'destructive' : 'secondary'}>{caseDetails.status}</Badge>
        </div>
        <p className="text-muted-foreground">Case ID: {caseDetails.id} | Opened: {caseDetails.dateOpened}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Conversation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {caseDetails.conversation.map((entry, index) => (
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
                                    <AvatarImage src={entry.author.avatar} />
                                    <AvatarFallback>{entry.author.name.charAt(0)}</AvatarFallback>
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
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><Link href="#" className="text-primary hover:underline">telegram_screenshots.zip</Link></li>
                        <li className="flex items-center"><Link href="#" className="text-primary hover:underline">transaction_details.pdf</Link></li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
