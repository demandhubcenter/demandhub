import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react";

// This is mock data. In a real app, this would come from a CMS or database based on the slug.
const post = {
  title: "The Rise of AI in Fraud Detection and Recovery",
  author: {
    name: "Alice Johnson",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman portrait",
    bio: "Alice is the Founder & CEO of DemandHub, with over 15 years of experience in cybersecurity and digital forensics.",
  },
  date: "October 30, 2023",
  tags: ["AI", "Cybersecurity", "Forensics"],
  image: { src: "https://placehold.co/1200x600.png", hint: "futuristic AI" },
  content: `
    <p class="lead text-lg text-muted-foreground mb-6">In an era where digital transactions are the norm, the methods employed by fraudsters have become increasingly sophisticated. Traditional security measures are often a step behind. Enter Artificial Intelligence (AI), a transformative technology that is revolutionizing how we identify, prevent, and recover from financial fraud.</p>
    <h3 class="text-2xl font-bold mt-8 mb-4">Proactive Threat Identification</h3>
    <p class="mb-6">AI algorithms can analyze vast datasets of transactions in real-time, identifying patterns and anomalies that would be invisible to human analysts. By learning what constitutes 'normal' behavior for a user or system, AI can flag suspicious activities with incredible accuracy, stopping fraud before it even happens.</p>
    <ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
        <li><strong>Behavioral Analytics:</strong> AI models create a unique profile for each user, detecting deviations in transaction times, amounts, locations, and more.</li>
        <li><strong>Network Analysis:</strong> It can map out complex networks of accounts and transactions to uncover sophisticated fraud rings that would otherwise remain hidden.</li>
        <li><strong>Predictive Modeling:</strong> By analyzing historical fraud data, AI can predict which accounts or transactions are most likely to be fraudulent in the future.</li>
    </ul>
    <h3 class="text-2xl font-bold mt-8 mb-4">Accelerating the Recovery Process</h3>
    <p class="mb-6">When fraud does occur, time is of the essence. AI plays a crucial role in the recovery process by automating and accelerating on-chain forensics. It can trace the movement of stolen funds across multiple blockchains and jurisdictions in a fraction of the time it would take a human team. This rapid analysis is critical for coordinating with exchanges and law enforcement to freeze assets before they disappear completely.</p>
    <blockquote class="border-l-4 border-primary pl-4 italic my-8 text-muted-foreground">
        "AI is our most powerful ally in the fight against digital fraud. It gives us the speed and scale needed to protect our clients in a rapidly evolving threat landscape."
    </blockquote>
    <p>The integration of AI into our recovery toolkit at DemandHub has significantly increased our success rate. It allows our human experts to focus on the strategic aspects of a case—liaising with financial institutions, navigating legal complexities, and providing support to our clients—while the AI handles the heavy lifting of data analysis. The future of asset recovery is not just about human expertise; it's about augmenting that expertise with the power of intelligent machines.</p>
  `,
};

const comments = [
    {
        author: { name: "Bob Williams", avatar: "https://placehold.co/100x100.png", hint: "man portrait" },
        date: "1 day ago",
        text: "This is a fantastic overview. The point about behavioral analytics is key. We've seen it work wonders in preventing account takeovers."
    },
    {
        author: { name: "Charlie Brown", avatar: "https://placehold.co/100x100.png", hint: "person portrait" },
        date: "2 days ago",
        text: "I'd be interested to learn more about the challenges of AI, like dealing with adversarial attacks or model bias. Do you plan a follow-up article?"
    }
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    // In a real app, this would come from useAuth()
    const isSignedIn = true;

  return (
    <>
      <section className="py-12 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-2 mb-4">
              {post.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint={post.author.hint} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
            </div>
          </div>
           <div className="relative h-[400px] w-full mb-12">
                <Image
                    src={post.image.src}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                    data-ai-hint={post.image.hint}
                />
            </div>

            <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></article>

             <Separator className="my-12" />

             <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <h3 className="text-lg font-semibold">Share this post</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon"><Twitter className="h-5 w-5" /></Button>
                    <Button variant="outline" size="icon"><Facebook className="h-5 w-5" /></Button>
                    <Button variant="outline" size="icon"><Linkedin className="h-5 w-5" /></Button>
                    <Button variant="outline" size="icon"><Link2 className="h-5 w-5" /></Button>
                </div>
             </div>

             <Separator className="my-12" />

             <Card className="bg-primary/5">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint={post.author.hint}/>
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm text-muted-foreground">Written by</p>
                            <h4 className="text-xl font-bold">{post.author.name}</h4>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{post.author.bio}</p>
                </CardContent>
             </Card>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Comments ({comments.length})</h2>
            {isSignedIn ? (
                <div className="mb-12">
                    <Textarea placeholder="Write a comment..." className="mb-4" rows={4}/>
                    <Button>Submit Comment</Button>
                </div>
            ) : (
                <Card className="text-center p-8 mb-12 bg-primary/5">
                    <h3 className="text-xl font-semibold">Want to join the discussion?</h3>
                    <p className="text-muted-foreground mt-2 mb-4">Please sign in to leave a comment.</p>
                    <Button asChild>
                        <Link href="/signin">Sign In to Comment</Link>
                    </Button>
                </Card>
            )}

            <div className="space-y-8">
                {comments.map((comment, index) => (
                    <div key={index} className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} data-ai-hint={comment.author.hint}/>
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-baseline justify-between">
                                <p className="font-semibold">{comment.author.name}</p>
                                <p className="text-xs text-muted-foreground">{comment.date}</p>
                            </div>
                            <p className="text-muted-foreground mt-2">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
