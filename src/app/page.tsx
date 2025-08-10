import { Hero } from '@/components/home/hero';
import { ServicesPreview } from '@/components/home/services-preview';
import { WhyUs } from '@/components/home/why-us';
import { CaseStudiesTeaser } from '@/components/home/case-studies-teaser';
import { TestimonialsCarousel } from '@/components/home/testimonials-carousel';
import { NewsletterSignup } from '@/components/home/newsletter-signup';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ServicesPreview />
      <WhyUs />
      <CaseStudiesTeaser />
      <TestimonialsCarousel />
      <NewsletterSignup />
    </div>
  );
}
