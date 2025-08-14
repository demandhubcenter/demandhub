
import { initialPosts } from "@/lib/initial-data";
import { notFound } from "next/navigation";
import { BlogPostClientPage } from "@/components/blog/blog-post-client-page";

export async function generateStaticParams() {
  // In a real app, this would fetch slugs from a database
  return initialPosts.map((post) => ({
    slug: post.slug,
  }));
}

// This is a server-side data fetching function
async function getPost(slug: string) {
    // This is a placeholder for fetching data. In a real app, you'd use the slug
    // to fetch from a database or API. For now, we fetch from the initial data.
    return initialPosts.find(p => p.slug === slug);
}


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);

    if (!post) {
      notFound();
    }

  return <BlogPostClientPage post={post} />;
}
