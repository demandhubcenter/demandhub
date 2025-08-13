
'use client';

import { TestimonialForm } from '@/components/admin/testimonial-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTestimonial } from '@/context/testimonial-context';
import { notFound } from 'next/navigation';
import React from 'react';


export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params);
  const { getTestimonialById } = useTestimonial();
  const testimonial = getTestimonialById(resolvedParams.id);

  if (!testimonial) {
    notFound();
  }

  return (
     <div className="space-y-8">
         <Button variant="ghost" asChild className="mb-4 -ml-4">
            <Link href="/admin/testimonials">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Testimonials
            </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold mb-1">Edit Testimonial</h1>
            <p className="text-muted-foreground mb-8">Update the details for this success story.</p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Editing: {testimonial.headline}</CardTitle>
                <CardDescription>ID: {testimonial.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <TestimonialForm existingTestimonial={testimonial} />
            </CardContent>
        </Card>
     </div>
  );
}
