
import { initialTestimonials } from '@/lib/initial-data';
import { notFound } from 'next/navigation';
import { EditTestimonialClientPage } from '@/components/admin/edit-testimonial-client-page';


export async function generateStaticParams() {
  return initialTestimonials.map((testimonial) => ({
    id: testimonial.id,
  }));
}

async function getTestimonial(id: string) {
    // In a real app, this would fetch from a database.
    // For this static example, we find it in the initial data.
    return initialTestimonials.find(t => t.id === id);
}

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await getTestimonial(params.id);

  if (!testimonial) {
    notFound();
  }

  return <EditTestimonialClientPage testimonial={testimonial} />;
}
