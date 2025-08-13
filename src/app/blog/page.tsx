
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
import { useMemo, useState } from "react";

const POSTS_PER_PAGE = 3;

export default function BlogIndexPage() {
    const { user } = useAuth();
    const { posts } = useBlog();
    const [currentPage, setCurrentPage] = useState(1);

    const featuredPosts = useMemo(() => posts.filter(p => p.featured).slice(0, 3), [posts]);
    const regularPosts = useMemo(() => posts.filter(p => !p.featured), [posts]);
    
    const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return regularPosts.slice(startIndex, endIndex);
    }, [regularPosts, currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    }

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    }

  return (
    <>
      <section className="relative py-20 md:py-32 bg-primary/5">
         <Image
          src="https://res.cloudinary.com/jerrick/image/upload/c_fill,d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,h_375,q_auto,w_625/68213d5213e3a7001d6d1cf1.jpg"
          alt="Blog background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 opacity-10"
          data-ai-hint="typewriter blog"
        />
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
                 {paginatedPosts.map((post) => (
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

            <div className="flex justify-center items-center mt-12 gap-4">
                <Button variant="outline" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </span>
                <Button variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
          </div>
        </section>
    </>
  );
}
