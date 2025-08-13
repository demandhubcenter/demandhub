import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, FileText, BarChart } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Risk Management",
    description: "Identify & mitigate fraudulent schemes before you’re scammed with our proactive analysis.",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Claim Assessment",
    description: "Comprehensive case evaluation with zero upfront fees to determine recovery viability.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Intelligence Gathering",
    description: "Deep market scans & on-chain forensic analysis to track and trace lost assets.",
  },
];

export function ServicesPreview() {
  return (
    <section className="relative py-20 md:py-28 bg-background">
      <Image
        src="https://image.vietnamnews.vn/uploadvnnews/Article/2025/7/22/438476_5224137316189388_ayqt7akm.png"
        alt="Services background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 opacity-5"
        data-ai-hint="digital abstract"
      />
       <div className="absolute inset-0 -z-10 bg-background/90"></div>
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Expertise</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A multi-faceted approach to digital fund recovery.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="text-base">
                {service.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
