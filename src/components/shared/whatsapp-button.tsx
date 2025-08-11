"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Draggable from 'react-draggable';
import { useRef } from 'react';

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="currentColor"
      className="h-7 w-7 text-white"
    >
      <path
        fill="#fff"
        d="M36.1,34.3c-0.2-0.1-1.4-0.7-1.6-0.8c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.6,0.8-0.8,0.9c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.1c-0.7-0.6-1.2-1.4-1.4-1.6c-0.2-0.2-0.1-0.4,0-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.1,0-0.2,0-0.4c-0.1-0.1-0.5-1.3-0.7-1.8c-0.2-0.5-0.4-0.4-0.5-0.4H28c-0.2,0-0.4,0.1-0.5,0.2c-0.1,0.1-0.5,0.5-0.5,1.2s0.5,1.4,0.6,1.5c0.1,0.1,1,1.6,2.4,2.2c0.3,0.2,0.6,0.3,0.8,0.4c0.4,0.1,0.8,0.1,1.1,0.1c0.3-0.1,1.4-0.8,1.6-1.5c0.2-0.7,0.2-1.3,0.1-1.4C36.6,34.5,36.4,34.4,36.1,34.3z"
      ></path>
      <path
        fill="#fff"
        d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M24,41.4C15,41.4,7.6,34,7.6,25C7.6,16,15,8.6,24,8.6c9,0,16.4,7.4,16.4,16.4C40.4,34,33,41.4,24,41.4z"
      ></path>
    </svg>
);


export function WhatsAppButton() {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef}>
        <div ref={nodeRef} className="fixed bottom-4 left-4 z-50 cursor-move">
        <Button
            asChild
            size="icon"
            className="rounded-full shadow-lg h-14 w-14 bg-[#25D366] hover:bg-[#1EBE57]"
        >
            {/* Replace the number with your actual WhatsApp business number */}
            <Link href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span className="sr-only">Chat on WhatsApp</span>
            </Link>
        </Button>
        </div>
    </Draggable>
  );
}
