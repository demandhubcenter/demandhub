
'use client'

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Link2, ArrowLeft } from "lucide-react";
import { useBlog } from "@/context/blog-context";
import { useAuth } from "@/context/auth-context";
import { notFound, useRouter } from "next/navigation";


export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const { getPostBySlug, addCommentToPost } = useBlog();
    const post = getPostBySlug(params.slug);
    const { user } = useAuth();
    const router = useRouter();

    if (!post) {
      notFound();
    }

  return (
    <>
      <section className="py-12 bg-background">
        <div className="container max-w-4xl">
         <Button variant="ghost" onClick={() => router.back()} className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
        </Button>
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
                <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
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
            <h2 className="text-3xl font-bold mb-8">Comments ({post.comments.length})</h2>
            {user ? (
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
                {post.comments.map((comment, index) => (
                    <div key={index} className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} data-ai-hint={comment.author.hint}/>
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-baseline justify-between">
                                <p className="font-semibold">{comment.author.name}</p>
                                <p className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</p>
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
