
'use client'

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { User } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useBlog } from "@/context/blog-context";
import { useMemo } from "react";

export default function BlogIndexPage() {
    const { user } = useAuth();
    const { posts } = useBlog();

    const featuredPosts = useMemo(() => posts.filter(p => p.featured).slice(0, 3), [posts]);
    const regularPosts = useMemo(() => posts.filter(p => !p.featured), [posts]);


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

      {!user && (
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
                            <p className="text-sm text-muted-foreground">By {post.author.name} on {new Date(post.date).toLocaleDateString()}</p>
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
