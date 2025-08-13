
'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTestimonial } from "@/context/testimonial-context";


export default function TestimonialsPage() {
    const { testimonials } = useTestimonial();
  return (
    <>
      <section className="py-20 md:py-32 bg-primary/5">
        <div className="container max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Client Success Stories</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
            Real-world examples of how we've helped individuals and businesses recover their digital assets and find justice.
          </p>
        </div>
      </section>
      
      <div className="relative">
        <div 
          className="absolute inset-0 h-full w-full bg-cover bg-fixed bg-center opacity-10" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1518974886828-228f747864a6?w=1920&h=1080&q=80&fit=crop')"}}
          data-ai-hint="abstract technology"
        ></div>
        <section className="relative py-20 md:py-28 bg-transparent">
          <div className="container max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((study, index) => (
                <Card key={study.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="relative h-48 w-full mb-4">
                      <Image
                        src={study.image.src}
                        alt={study.headline}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                        data-ai-hint={study.image.hint}
                      />
                    </div>
                    <CardTitle>{study.headline}</CardTitle>
                    <div className="flex gap-2 pt-2">
                        {study.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="italic">"{study.quote}"</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
