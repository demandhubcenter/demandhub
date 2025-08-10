import Image from "next/image";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      <section className="py-20 md:py-32 bg-primary/5">
        <div className="container max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Get in Touch</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
            Whether you're a victim of fraud or have questions about our services, we're here to help. Reach out for a free, confidential assessment.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>support@demandhub.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span>123 Recovery Lane, Suite 100, New York, NY 10001</span>
                  </div>
                </div>
              </div>
              <div>
                 <h2 className="text-2xl font-bold mb-4">Office Location</h2>
                 <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
                     <Image
                        src="https://placehold.co/600x400.png"
                        alt="Map to office"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="city map"
                     />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       <div className="fixed bottom-4 right-4 z-50">
          <Button size="lg" className="rounded-full shadow-lg">
            <MessageSquare className="mr-2 h-5 w-5" />
            Live Chat
          </Button>
        </div>
    </>
  );
}
