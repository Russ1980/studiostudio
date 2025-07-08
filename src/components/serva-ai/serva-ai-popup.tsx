
"use client";

import { Button } from "@/components/ui/button";
import { X, Mic } from "lucide-react";
import { ServaAIConversation } from "./serva-ai-conversation";
import { ServaAIInputArea } from "./serva-ai-input-area";
import { useServaAI } from "@/hooks/use-serva-ai";

export function ServaAIPopup() {
    const { closeServaAI } = useServaAI();
  return (
    <div className="fixed bottom-4 right-4 z-[999] flex h-[70vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl animate-in fade-in-0 slide-in-from-bottom-5">
      <header className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Mic className="h-5 w-5" />
            </div>
            <h2 className="text-base font-semibold">Serva AI Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={closeServaAI}>
          <X className="h-4 w-4" />
        </Button>
      </header>
      <ServaAIConversation />
      <ServaAIInputArea />
    </div>
  );
}
