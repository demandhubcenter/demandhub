import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User } from "lucide-react";

// This would come from a CMS or database
const featuredPosts = [
  {
    slug: "post-1",
    image: { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&q=80&fit=crop", hint: "cyber security" },
    title: "The Rise of AI in Fraud Detection and Recovery",
    excerpt: "Discover how artificial intelligence is becoming a game-changer in the fight against sophisticated financial scams.",
    tags: ["AI", "Cybersecurity"],
  },
  {
    slug: "post-2",
    image: { src: "https://images.unsplash.com/photo-1621452773357-011f76285314?w=600&h=400&q=80&fit=crop", hint: "crypto wallet" },
    title: "5 Telltale Signs of a Cryptocurrency Scam",
    excerpt: "Learn to spot the red flags before you invest. We break down the most common tactics used by crypto fraudsters.",
    tags: ["Crypto", "Scam Alert"],
  },
  {
    slug: "post-3",
    image: { src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&q=80&fit=crop", hint: "person on laptop" },
    title: "Protecting Your Small Business from Wire Fraud",
    excerpt: "Small businesses are prime targets. Implement these essential security measures to safeguard your company's finances.",
    tags: ["Wire Fraud", "Business"],
  },
];

const regularPosts = [
    {
        slug: "post-4",
        image: { src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&q=80&fit=crop", hint: "padlock" },
        title: "What to Do Immediately After a Phishing Attack",
        excerpt: "Time is critical. Follow these steps to mitigate damage and begin the recovery process after your data has been compromised.",
        tags: ["Phishing", "Recovery"],
        author: "Jane Doe",
        date: "October 26, 2023"
    },
    {
        slug: "post-5",
        image: { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&q=80&fit=crop", hint: "data privacy" },
        title: "Understanding On-Chain Forensics",
        excerpt: "A deep dive into the technology we use to trace stolen digital assets across the blockchain.",
        tags: ["Blockchain", "Forensics"],
        author: "John Smith",
        date: "October 22, 2023"
    },
    {
        slug: "post-6",
        image: { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&q=80&fit=crop", hint: "family using computer" },
        title: "How to Talk to Your Family About Online Safety",
        excerpt: "Protect your loved ones from common scams with these simple conversation starters and tips.",
        tags: ["Online Safety", "Family"],
        author: "Alice Johnson",
        date: "October 18, 2023"
    },
    {
        slug: "post-7",
        image: { src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&q=80&fit=crop", hint: "real estate closing" },
        title: "The Dangers of Real Estate Wire Fraud",
        excerpt: "Buying a home? Here's how to avoid the increasingly common scams targeting down payments.",
        tags: ["Real Estate", "Wire Fraud"],
        author: "Bob Williams",
        date: "October 15, 2023"
    },
     {
        slug: "post-8",
        image: { src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&h=400&q=80&fit=crop", hint: "mobile banking" },
        title: "Securing Your Digital Wallet: A 2024 Guide",
        excerpt: "Best practices for keeping your cryptocurrency and NFTs safe from hackers.",
        tags: ["Crypto", "NFT", "Security"],
        author: "Charlie Brown",
        date: "October 11, 2023"
    },
     {
        slug: "post-9",
        image: { src: "https://images.unsplash.com/photo-1541829076-248499980da1?w=600&h=400&q=80&fit=crop", hint: "sad person" },
        title: "The Emotional Toll of Financial Fraud",
        excerpt: "It's not just about the money. We explore the psychological impact of scams and how to find support.",
        tags: ["Mental Health", "Support"],
        author: "Diana Prince",
        date: "October 5, 2023"
    }
];


export default function BlogIndexPage() {
    // In a real app, this would come from useAuth()
    const isSignedIn = false;

  return (
    <>
      <section className="py-20 md:py-32 bg-primary/5">
        <div className="container max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">The DemandHub Blog</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
            Insights, alerts, and expert advice on digital security and asset recovery.
          </p>
        </div>
      </section>

      {!isSignedIn && (
        <section className="py-6 bg-accent/50">
            <div className="container max-w-7xl">
                 <Alert>
                    <User className="h-4 w-4" />
                    <AlertTitle>Want to join the conversation?</AlertTitle>
                    <AlertDescription>
                        <Link href="/signup" className="font-semibold underline">Create an account</Link> to comment on our articles.
                    </AlertDescription>
                </Alert>
            </div>
        </section>
      )}

       <section className="py-20 md:py-28 bg-background">
          <div className="container max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                 <Card key={post.slug} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0">
                        <Link href={`/blog/${post.slug}`}>
                            <div className="relative h-48 w-full">
                            <Image
                                src={post.image.src}
                                alt={post.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg"
                                data-ai-hint={post.image.hint}
                            />
                            </div>
                        </Link>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow p-6">
                        <div className="flex gap-2 mb-2">
                            {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                        <CardTitle className="text-xl mb-2"><Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link></CardTitle>
                        <CardDescription className="flex-grow">{post.excerpt}</CardDescription>
                         <Button variant="link" className="p-0 mt-4 self-start" asChild>
                            <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-primary/5">
          <div className="container max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-4xl">All Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {regularPosts.map((post) => (
                    <Card key={post.slug} className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
                         <CardHeader className="p-0">
                            <Link href={`/blog/${post.slug}`}>
                                <div className="relative h-48 w-full">
                                <Image
                                    src={post.image.src}
                                    alt={post.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg"
                                     data-ai-hint={post.image.hint}
                                />
                                </div>
                            </Link>
                        </CardHeader>
                        <CardContent className="p-6">
                             <div className="flex gap-2 mb-2">
                                {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                            <CardTitle className="text-xl mb-2"><Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link></CardTitle>
                            <p className="text-sm text-muted-foreground">By {post.author} on {post.date}</p>
                            <CardDescription className="mt-4">{post.excerpt}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <Button variant="outline" className="mr-2">Previous</Button>
                <Button>Next</Button>
            </div>
          </div>
        </section>
    </>
  );
}
