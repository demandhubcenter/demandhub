
"use client";

import { useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateChatResponse } from "@/ai/flows/live-chat-flow";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  sender: "user" | "agent";
}

const initialMessages: Message[] = [
  {
    text: "Welcome to DemandHub support! How can we help you today?",
    sender: "agent",
  },
];

export function LiveChatButton() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (scrollAreaRef.current) {
        // A bit of a hack to get the viewport element from the Radix component
        const viewport = scrollAreaRef.current.querySelector('div[style*="overflow"]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const { response } = await generateChatResponse({ message: inputValue });
      const agentMessage: Message = { text: response, sender: "agent" };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error("Failed to get chat response:", error);
      const errorMessage: Message = {
        text: "Sorry, I'm having trouble connecting. Please try again.",
        sender: "agent",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
        <Draggable>
          <div className="fixed bottom-4 right-4 z-50 cursor-move">
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full shadow-lg h-14 w-14 animate-pulse hover:animate-none"
                >
                    <MessageSquare className="h-7 w-7" />
                    <span className="sr-only">Open Live Chat</span>
                </Button>
            </SheetTrigger>
          </div>
        </Draggable>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Live Chat Support</SheetTitle>
          <SheetDescription>
            Chat with a support agent for help with your case.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow my-4 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg p-3 max-w-xs",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="rounded-lg p-3 bg-muted">
                    <p className="text-sm text-muted-foreground">Agent is typing...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <SheetFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
