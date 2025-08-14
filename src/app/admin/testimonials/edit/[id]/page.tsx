
'use server';

import { useTestimonial, initialTestimonials } from '@/context/testimonial-context';
import { notFound } from 'next/navigation';
import { EditTestimonialClientPage } from '@/components/admin/edit-testimonial-client-page';


export function generateStaticParams() {
  return initialTestimonials.map((testimonial) => ({
    id: testimonial.id,
  }));
}

async function getTestimonial(id: string) {
    const { getTestimonialById } = useTestimonial();
    return getTestimonialById(id);
}

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await getTestimonial(params.id);

  if (!testimonial) {
    notFound();
  }

  return <EditTestimonialClientPage testimonial={testimonial} />;
}
