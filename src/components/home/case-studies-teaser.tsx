import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CaseStudiesTeaser() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <Badge variant="outline">Success Story</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              $1.2M Recovered from Corporate Phishing Scam
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A swift and coordinated response allowed us to freeze and recover a majority of funds transferred in a sophisticated wire fraud attack on a mid-sized enterprise.
            </p>
            <ul className="mt-6 space-y-2 text-muted-foreground">
              <li><span className="font-semibold text-primary">Timeline:</span> 14 Days</li>
              <li><span className="font-semibold text-primary">Challenge:</span> Multi-jurisdictional transfers</li>
              <li><span className="font-semibold text-primary">Outcome:</span> 95% of funds recovered</li>
            </ul>
            <Button asChild className="mt-8">
              <Link href="/testimonials">View Full Case Studies</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="relative h-96">
                    <Image
                      src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=600&h=400&q=80"
                      alt="Before recovery fund status"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      data-ai-hint="financial loss chart"
                    />
                    <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-3 py-1 text-white">
                      Before: $50,000
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-96">
                    <Image
                      src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&q=80"
                      alt="After recovery fund status"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      data-ai-hint="financial gain chart"
                    />
                     <div className="absolute bottom-4 left-4 rounded-md bg-primary/80 px-3 py-1 text-white">
                      After: $1,200,000 Recovered
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2"/>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
