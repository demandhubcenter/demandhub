import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Target, Eye, Gem } from "lucide-react";

const teamMembers = [
  { name: "Alice Johnson", title: "Founder & CEO", avatar: "https://placehold.co/200x200.png", hint: "woman portrait" },
  { name: "Bob Williams", title: "Head of Forensics", avatar: "https://placehold.co/200x200.png", hint: "man portrait" },
  { name: "Charlie Brown", title: "Lead Investigator", avatar: "https://placehold.co/200x200.png", hint: "person portrait" },
  { name: "Diana Prince", title: "Client Relations", avatar: "https://placehold.co/200x200.png", hint: "woman portrait" },
];

const timelineEvents = [
  { year: "2019", event: "DemandHub Founded" },
  { year: "2020", event: "First Major Corporate Case Recovered" },
  { year: "2022", event: "Expanded to International Markets" },
  { year: "2024", event: "Reached 500+ Successful Recoveries" },
  { year: "2025", event: "Goal: 1,000 Cases Recovered" },
];

const values = [
    { icon: <Target className="h-10 w-10 text-primary"/>, title: "Integrity", description: "Operating with unwavering honesty and transparency in every case."},
    { icon: <Gem className="h-10 w-10 text-primary"/>, title: "Excellence", description: "Striving for the highest standards in our technology and service."},
    { icon: <Eye className="h-10 w-10 text-primary"/>, title: "Innovation", description: "Continuously advancing our methods to stay ahead of fraudsters."}
]

export default function AboutPage() {
  return (
    <>
      <section className="relative py-20 md:py-32 bg-primary/5">
        <Image
          src="https://placehold.co/1920x600.png"
          alt="Office background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 opacity-10"
          data-ai-hint="modern office"
        />
        <div className="container max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Our Mission & Vision</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
            To provide a beacon of hope and a path to justice for victims of digital fraud worldwide, by leveraging unparalleled expertise and technology to recover lost assets.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">The experts dedicated to reclaiming your assets.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Image src={member.avatar} alt={member.name} width={120} height={120} className="mx-auto mb-4 rounded-full" data-ai-hint={member.hint}/>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.title}</p>
                  <a href="#" className="text-muted-foreground hover:text-primary mt-2 inline-block"><Linkedin className="h-5 w-5"/></a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-primary/5">
          <div className="container max-w-7xl">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Journey</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Key milestones in our history of fighting fraud.</p>
              </div>
              <div className="relative">
                  <div className="absolute left-0 top-1/2 w-full h-0.5 bg-border -translate-y-1/2"></div>
                  <div className="relative grid grid-cols-2 md:grid-cols-5 gap-8">
                      {timelineEvents.map((item, index) => (
                          <div key={index} className="flex flex-col items-center text-center">
                              <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mb-2">{index + 1}</div>
                              <p className="font-semibold text-lg">{item.year}</p>
                              <p className="text-sm text-muted-foreground">{item.event}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
          <div className="container max-w-7xl">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Core Values</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {values.map((value, index) => (
                       <Card key={index} className="text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2">
                          <CardHeader className="flex flex-col items-center">
                              {value.icon}
                              <CardTitle className="mt-4 text-xl font-semibold">{value.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-muted-foreground">{value.description}</p>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
      </section>
    </>
  );
}
