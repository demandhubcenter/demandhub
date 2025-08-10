import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function NewsletterSignup() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-7xl">
        <Card className="bg-primary text-primary-foreground shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Stay Ahead of Scams</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg mt-2">
              Subscribe to our newsletter for the latest scam alerts & recovery tips.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex w-full max-w-lg mx-auto items-center space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus:ring-accent"
              />
              <Button type="submit" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Subscribe
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
