import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function NewsletterSignup() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-7xl">
        <Card className="bg-primary text-primary-foreground shadow-lg overflow-hidden">
         <div className="grid md:grid-cols-2 items-center">
            <div className="p-8">
              <CardHeader className="p-0 text-left">
                <CardTitle className="text-3xl font-bold">Stay Ahead of Scams</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-lg mt-2">
                  Subscribe to our newsletter for the latest scam alerts & recovery tips.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 mt-6">
                <form className="flex flex-col sm:flex-row w-full max-w-lg items-center gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus:ring-accent w-full"
                  />
                  <Button type="submit" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </div>
            <div className="hidden md:block h-full bg-accent/20">
              {/* You can add a decorative image or icon here */}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
