
"use client";

import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { runServaAIFlow, type ServaAIOutput } from '@/ai/flows/serva-flow';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'text' | 'chart' | 'table';
    payload?: any;
  };
}

interface ServaAIContextType {
  isOpen: boolean;
  messages: ConversationMessage[];
  isProcessing: boolean;
  recentTasks: string[];
  openServaAI: () => void;
  closeServaAI: () => void;
  processQuery: (query: string) => Promise<void>;
  clearConversation: () => void;
}

const ServaAIContext = createContext<ServaAIContextType | null>(null);

const initialMessage: ConversationMessage = {
    id: uuidv4(),
    role: 'assistant',
    content: "Hello! I'm Serva AI. How can I help you today? You can ask me to summarize reports, analyze trends, or find information.",
    timestamp: new Date(),
};


export function ServaAIProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([initialMessage]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentTasks, setRecentTasks] = useState<string[]>([]);

  const openServaAI = () => setIsOpen(true);
  const closeServaAI = () => setIsOpen(false);

  const clearConversation = () => setMessages([initialMessage]);

  const processQuery = useCallback(async (query: string) => {
    const userMessage: ConversationMessage = {
      id: uuidv4(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setRecentTasks(prev => [query, ...prev].slice(0, 5));
    setIsProcessing(true);

    try {
      const response: ServaAIOutput = await runServaAIFlow(query);
      
      const assistantMessage: ConversationMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        metadata: response.data ? { type: response.data.type, payload: response.data.payload } : undefined,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error processing query:", error);
      const errorMessage: ConversationMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const value = useMemo(() => ({
    isOpen,
    messages,
    isProcessing,
    recentTasks,
    openServaAI,
    closeServaAI,
    processQuery,
    clearConversation,
  }), [isOpen, messages, isProcessing, recentTasks, processQuery]);

  return (
    <ServaAIContext.Provider value={value}>
      {children}
    </ServaAIContext.Provider>
  );
}

export function useServaAI() {
  const context = useContext(ServaAIContext);
  if (!context) {
    throw new Error('useServaAI must be used within a ServaAIProvider');
  }
  return context;
}
