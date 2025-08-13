
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    image: { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&q=80&fit=crop", hint: "relieved person computer" },
    headline: "Recovered $120K from Crypto Investment Scam",
    quote: "I thought my retirement savings were gone forever. DemandHub's forensic team traced the transactions and recovered almost everything.",
    tags: ["Crypto", "Forensics"],
  },
  {
    image: { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&q=80&fit=crop", hint: "business owner" },
    headline: "Saved a Small Business from Ransomware Attack",
    quote: "Our operations were halted. DemandHub not only helped us regain access without paying the ransom but also fortified our systems.",
    tags: ["Ransomware", "Cybersecurity"],
  },
  {
    image: { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&q=80&fit=crop", hint: "professional on phone" },
    headline: "Intercepted Fraudulent Wire Transfer of $500K",
    quote: "Their rapid response team worked with banks to freeze the wire transfer mid-transit. It was incredible.",
    tags: ["Wire Fraud", "Crisis Management"],
  },
  {
    image: { src: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&q=80&fit=crop", hint: "secure online shopping" },
    headline: "Uncovered an E-commerce Phishing Ring",
    quote: "We were losing customer trust. They identified the source of the phishing attacks and helped us secure our platform.",
    tags: ["Phishing", "E-commerce"],
  },
  {
    image: { src: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600&h=400&q=80&fit=crop", hint: "happy couple home" },
    headline: "Recovered a Down Payment from Real Estate Scam",
    quote: "A sophisticated scam nearly cost us our dream home. DemandHub's expertise made all the difference.",
    tags: ["Real Estate", "Individual Recovery"],
  },
  {
    image: { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlX92i4bneODDgD15M8Xir-G8vOvweCEkZFQ&s", hint: "digital art" },
    headline: "Traced and Recovered Stolen NFT Collection",
    quote: "My valuable digital art was stolen from my wallet. Their on-chain analysis was key to getting it back.",
    tags: ["NFT", "Blockchain"],
  },
];

export default function TestimonialsPage() {
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
              {caseStudies.map((study, index) => (
                <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
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
