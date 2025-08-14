import { useBlog } from '@/context/blog-context';
import { initialPosts } from '@/lib/initial-data';
import { notFound } from 'next/navigation';
import { EditBlogPostClientPage } from '@/components/admin/edit-blog-post-client-page';

export async function generateStaticParams() {
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
