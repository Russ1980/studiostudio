
"use client";

import { useEffect, useRef } from "react";
import { useServaAI, type ConversationMessage } from "@/hooks/use-serva-ai";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Wand2, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Wand2 className="h-5 w-5 text-primary" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
      </div>
    </motion.div>
  );
}

function Message({ message }: { message: ConversationMessage }) {
  const isAssistant = message.role === 'assistant';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn("flex items-start gap-3", isAssistant ? "" : "justify-end")}
    >
      {isAssistant && (
        <Avatar className="h-10 w-10 border bg-primary/10">
          <AvatarFallback className="bg-transparent">
            <Wand2 className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-sm rounded-2xl p-3 text-sm",
          isAssistant
            ? "bg-secondary text-secondary-foreground rounded-bl-none"
            : "bg-primary text-primary-foreground rounded-br-none"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
       {!isAssistant && (
        <Avatar className="h-10 w-10 border bg-secondary">
          <AvatarFallback className="bg-transparent text-muted-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}

export function ServaAIConversation() {
  const { messages, isProcessing } = useServaAI();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  return (
    <div ref={scrollAreaRef} className="flex-1 space-y-6 overflow-y-auto p-4">
      <AnimatePresence>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isProcessing && <TypingIndicator />}
      </AnimatePresence>
    </div>
  );
}
