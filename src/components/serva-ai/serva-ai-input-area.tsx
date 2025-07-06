
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Paperclip } from "lucide-react";
import { useServaAI } from "@/hooks/use-serva-ai";
import { cn } from "@/lib/utils";

const suggestions = [
    "Summarize Q2 revenue",
    "Analyze cash flow",
    "Find overdue invoices"
];

export function ServaAIInputArea() {
  const [query, setQuery] = useState("");
  const { processQuery, isProcessing } = useServaAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      processQuery(query);
      setQuery("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
      setQuery(suggestion);
      processQuery(suggestion);
      setQuery("");
  }

  return (
    <div className="border-t p-3">
        <div className="mb-2 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
                <Button key={suggestion} variant="outline" size="sm" className="text-xs" onClick={() => handleSuggestionClick(suggestion)} disabled={isProcessing}>
                    {suggestion}
                </Button>
            ))}
        </div>
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
            <Button variant="ghost" size="icon" type="button" className="shrink-0">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask Serva AI..."
                className="h-10 flex-1 rounded-full bg-secondary pr-12"
                disabled={isProcessing}
            />
            <Button
                type="submit"
                size="icon"
                className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
                    isProcessing && "animate-spin"
                )}
                disabled={isProcessing || !query.trim()}
            >
                <ArrowUp className="h-4 w-4" />
            </Button>
        </form>
    </div>
  );
}
