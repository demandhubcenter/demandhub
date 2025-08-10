import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What kind of cases do you handle?",
    answer: "We handle a wide range of digital asset recovery cases, including cryptocurrency scams, wire fraud, ransomware attacks, phishing schemes, and more. If you've lost digital funds due to fraudulent activity, we recommend a free assessment.",
  },
  {
    question: "How long does the recovery process take?",
    answer: "The duration varies depending on the complexity of the case. Our average recovery time is 21 days, but some cases can be resolved faster, while others may take several months. We provide a projected timeline after our initial assessment.",
  },
  {
    question: "What are your fees?",
    answer: "We operate on a 'no win, no fee' basis. We conduct a free initial assessment. If we take on your case, our fee is a percentage of the recovered funds. You pay nothing unless we are successful.",
  },
  {
    question: "Is my information kept confidential?",
    answer: "Absolutely. We guarantee 100% confidentiality. All information you share with us is protected by strict non-disclosure agreements and secure data handling protocols.",
  },
  {
    question: "What is your success rate?",
    answer: "While success rates vary by case type, we have a strong track record of successful recoveries. We are transparent about the likelihood of success after your free claim assessment.",
  },
  {
    question: "Do you work with law enforcement?",
    answer: "Yes, we frequently collaborate with law enforcement agencies and financial institutions worldwide. The evidence we gather is often crucial for legal proceedings and asset seizure.",
  },
  {
    question: "What do I need to get started?",
    answer: "To start your free assessment, you'll need to provide all relevant information and documentation related to your case. This includes transaction records, communications with the fraudsters, and any other evidence you have.",
  },
  {
    question: "Can you recover funds from anywhere in the world?",
    answer: "Our team has global reach and experience in dealing with multiple jurisdictions. While some countries present more challenges than others, our expertise in on-chain analysis allows us to trace assets across borders effectively.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="py-20 md:py-32 bg-primary/5">
        <div className="container max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Frequently Asked Questions</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
            Have questions? We have answers. Find information about our process, fees, and services.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
