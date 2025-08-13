
'use client';

import { TestimonialForm } from '@/components/admin/testimonial-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NewTestimonialPage() {
  return (
     <div>
         <Button variant="ghost" asChild className="mb-4 -ml-4">
            <Link href="/admin/testimonials">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Testimonials
            </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-1">Create New Testimonial</h1>
        <p className="text-muted-foreground mb-8">Fill out the form below to add a new success story.</p>
        <Card>
            <CardHeader>
                <CardTitle>New Testimonial Details</CardTitle>
                <CardDescription>This will be publicly visible on the testimonials page.</CardDescription>
            </CardHeader>
            <CardContent>
                <TestimonialForm />
            </CardContent>
        </Card>
     </div>
  );
}
