
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    quote: "DemandHub's team was professional, swift, and reassuring. They recovered funds we thought were lost forever. Truly life-saving service.",
    name: "John D.",
    role: "CEO, Tech Innovators",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&q=80",
    hint: "male ceo"
  },
  {
    quote: "The level of detail in their forensic analysis was astounding. They kept us informed at every step. Highly recommended for any digital asset issues.",
    name: "Sarah L.",
    role: "CFO, Global Logistics",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80",
    hint: "female cfo"
  },
  {
    quote: "We were devastated after the scam, but DemandHub turned the situation around in weeks. Their expertise is unmatched.",
    name: "Michael B.",
    role: "Individual Investor",
    avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=100&h=100&q=80",
    hint: "man portrait"
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="relative py-20 md:py-28">
       <Image
        src="https://www.grantthornton.co.uk/globalassets/1.-member-firms/united-kingdom/images/listing-image/910x544-trading.jpg"
        alt="Financial professionals working"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 opacity-5"
        data-ai-hint="trading desk"
      />
      <div className="absolute inset-0 -z-10 bg-primary/5"></div>
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Real stories from people and businesses we've helped.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full shadow-md">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Image
                        src={testimonial.avatar}
                        alt={`Avatar of ${testimonial.name}`}
                        width={80}
                        height={80}
                        className="mb-4 rounded-full"
                        data-ai-hint={testimonial.hint}
                      />
                      <p className="mb-4 text-base text-muted-foreground italic">"{testimonial.quote}"</p>
                      <div className="mt-auto">
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
