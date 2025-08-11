import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export function LiveChatButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-4 right-4 z-50">
          <Button size="icon" className="rounded-full shadow-lg h-14 w-14 animate-pulse hover:animate-none">
            <MessageSquare className="h-7 w-7" />
            <span className="sr-only">Open Live Chat</span>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Live Chat Support</SheetTitle>
          <SheetDescription>
            Welcome to DemandHub support! How can we help you today?
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 h-full flex flex-col">
            <div className="flex-grow space-y-4">
                {/* Placeholder for chat messages */}
                <div className="flex">
                    <div className="rounded-lg bg-muted p-3">
                        <p className="text-sm">Hello! I have a question about my case.</p>
                    </div>
                </div>
                 <div className="flex justify-end">
                    <div className="rounded-lg bg-primary text-primary-foreground p-3">
                        <p className="text-sm">We're here to help. What's your case ID?</p>
                    </div>
                </div>
            </div>
            <SheetFooter className="mt-auto">
                 <div className="flex w-full items-center space-x-2">
                    <Input type="text" placeholder="Type your message..." />
                    <Button type="submit">Send</Button>
                </div>
            </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
