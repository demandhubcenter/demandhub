import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, FileText, BarChart, BellRing, BrainCircuit, LifeBuoy } from "lucide-react";

const services = [
  {
    id: "risk-management",
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Risk Management",
    description: "Proactive identification and mitigation of fraudulent schemes. We help you build a stronger defense before you're a target.",
    details: "Our risk management services include vulnerability assessments, security protocol reviews, and employee training programs. We analyze your digital footprint to identify weak points that could be exploited by fraudsters, providing actionable recommendations to fortify your defenses.",
    image: { src: "https://placehold.co/500x400.png", hint: "security shield" },
  },
  {
    id: "claim-assessment",
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Claim Assessment",
    description: "A comprehensive, no-cost evaluation of your case to determine the viability of fund recovery.",
    details: "We start with a free, no-obligation assessment of your situation. Our experts review all provided evidence, evaluate the nature of the fraud, and use preliminary tracing techniques to gauge the likelihood of a successful recovery. You receive a clear report on our findings and recommended next steps.",
    image: { src: "https://placehold.co/500x400.png", hint: "document analysis" },
  },
  {
    id: "intelligence-gathering",
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Intelligence Gathering",
    description: "Utilizing advanced market scanning and on-chain forensic analysis to trace and track your lost assets.",
    details: "This is the core of our recovery process. We deploy proprietary software and expert analysts to conduct on-chain and off-chain investigations. We trace fund movements across multiple blockchains and jurisdictions, identify perpetrator wallets, and gather crucial evidence for law enforcement and legal action.",
    image: { src: "https://placehold.co/500x400.png", hint: "data chart" },
  },
  {
    id: "crisis-management",
    icon: <BellRing className="h-8 w-8 text-primary" />,
    title: "Crisis Management",
    description: "Immediate, decisive action to contain threats and manage the fallout from a security breach.",
    details: "In the critical hours following a scam or breach, our team provides rapid response support. We guide you through securing remaining assets, preserving evidence, and communicating with stakeholders. Our goal is to minimize damage and stabilize the situation swiftly.",
    image: { src:https://placehold.co/500x400.png", hint: "emergency plan" },
  },
  {
    id: "future-planning",
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "Future Planning",
    description: "Strategic advice and implementation of robust security measures to prevent future incidents.",
    details: "Beyond recovery, we help you plan for a secure future. Based on the specifics of your case, we develop a customized security roadmap. This can include multi-signature wallet setups, institutional-grade custody solutions, and ongoing monitoring services to protect you from evolving threats.",
    image: { src: "https://placehold.co/500x400.png", hint: "strategy roadmap" },
  },
  {
    id: "help-support",
    icon: <LifeBuoy className="h-8 w-8 text-primary" />,
    title: "Help & Support",
    description: "Dedicated support throughout the recovery process and beyond, ensuring you're never alone.",
    details: "We understand the emotional and financial toll of digital fraud. Our support team provides regular updates, answers your questions, and offers compassionate guidance throughout the entire recovery journey. We are your partners from start to finish.",
    image: { src: "https://placehold.co/500x400.png", hint: "customer support" },
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 md:py-32 bg-primary/5">
        <div className="container max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Our Services</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
            A complete suite of solutions designed to recover your digital assets and protect you from future threats.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-7xl">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? "order-1" : "order-1 md:order-2"}>
                  <div className="flex items-center gap-4 mb-4">
                    {service.icon}
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg mb-4">{service.description}</p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Learn More</AccordionTrigger>
                      <AccordionContent>
                        {service.details}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className={index % 2 === 0 ? "order-2" : "order-2 md:order-1"}>
                  <Image
                    src={service.image.src}
                    alt={service.title}
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg w-full h-auto"
                    data-ai-hint={service.image.hint}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
