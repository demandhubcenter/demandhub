import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LiveChatButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button size="lg" className="rounded-full shadow-lg animate-pulse hover:animate-none">
        <MessageSquare className="mr-2 h-5 w-5" />
        Live Chat
      </Button>
    </div>
  );
}
