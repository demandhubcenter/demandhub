import { CheckCircle2 } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import Image from "next/image";

const stats = [
  { value: 24, label: "24/7 Global Support" },
  { value: 100, label: "Confidentiality Guaranteed", suffix: "%" },
  { value: 21, label: "Average Recovery Time (Days)" },
  { value: 500, label: "Trusted by Clients Worldwide", prefix: "500+" },
];

const features = [
  "24/7 global support",
  "100% confidentiality guaranteed",
  "Average recovery time: 21 days",
  "No win, no fee policy",
  "Trusted by 500+ clients worldwide"
]

export function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-primary/5">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why DemandHub?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We stand apart with our commitment to transparency, speed, and success. Our clients trust us for our expertise and our results-driven approach.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="text-base font-medium text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-96 w-full">
            <Image 
                src="https://placehold.co/600x400.png"
                alt="Team working on recovery"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
                data-ai-hint="team collaboration"
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl font-bold text-primary md:text-5xl">
                {stat.prefix ? stat.prefix : <AnimatedCounter to={stat.value} />}
                {stat.suffix}
              </div>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
