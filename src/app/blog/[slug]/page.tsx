
'use server'

import { useBlog, initialPosts } from "@/context/blog-context";
import { notFound } from "next/navigation";
import { BlogPostClientPage } from "@/components/blog/blog-post-client-page";

export function generateStaticParams() {
  // In a real app, this would fetch slugs from a database
  return initialPosts.map((post) => ({
    slug: post.slug,
  }));
}

// This is a server-side data fetching function
async function getPost(slug: string) {
    // This is a placeholder for fetching data. In a real app, you'd use the slug
    // to fetch from a database or API. For now, we simulate it with the context.
    const { getPostBySlug } = useBlog();
    return getPostBySlug(slug);
}


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);

    if (!post) {
      notFound();
    }

  return <BlogPostClientPage post={post} />;
}
