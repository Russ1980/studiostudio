"use client";

import React, { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type SummarizeAction = (input: { [key: string]: string }) => Promise<{ summary: string } | { error: string }>;

interface SummarizeFormProps {
  action: SummarizeAction;
  inputName: string;
  placeholder: string;
  title: string;
}

export function SummarizeForm({ action, inputName, placeholder, title }: SummarizeFormProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const response = await action({ [inputName]: text });
        if ('summary' in response) {
          setResult(response.summary);
        } else if ('error' in response) {
          setError(response.error);
        } else {
          // This case should ideally not happen if the action always returns one of the two shapes.
          const res = response as any;
          if (res.error) {
             setError(res.error);
          } else {
             setError("An unexpected error occurred.");
          }
        }
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="min-h-48"
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending || !text.trim()}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {title}
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold">Summary</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
