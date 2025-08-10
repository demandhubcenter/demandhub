import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative bg-primary/5 py-20 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 top-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"
      ></div>
       <Image
        src="https://placehold.co/1920x1080.png"
        alt="Financial network illustration"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 opacity-5"
        data-ai-hint="financial network"
      />
      <div className="container max-w-7xl text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Digital Asset Recovery You Can Trust
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Rapid, reliable fund recovery for individuals & enterprises. We combine cutting-edge technology with expert analysis to reclaim what's yours.
          </p>
        </div>
        <div className="mt-10">
          <Button size="lg" asChild>
            <Link href="/contact">Get a Free Assessment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
