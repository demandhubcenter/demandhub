
'use server'

import { useBlog, initialPosts } from '@/context/blog-context';
import { notFound } from 'next/navigation';
import { EditBlogPostClientPage } from '@/components/admin/edit-blog-post-client-page';

export function generateStaticParams() {
  return initialPosts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string) {
    const { getPostBySlug } = useBlog();
    return getPostBySlug(slug);
}

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return <EditBlogPostClientPage post={post} />;
}
