"use client";

import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { servaAIFlow } from '@/ai/flows/serva-flow';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'text' | 'chart' | 'table';
    data?: any;
  };
}

interface ServaAIContextType {
  isOpen: boolean;
  messages: ConversationMessage[];
  isProcessing: boolean;
  openServaAI: () => void;
  closeServaAI: () => void;
  processQuery: (query: string) => Promise<void>;
  clearConversation: () => void;
}

const ServaAIContext = createContext<ServaAIContextType | null>(null);

export function ServaAIProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const openServaAI = () => setIsOpen(true);
  const closeServaAI = () => setIsOpen(false);

  const clearConversation = () => setMessages([]);

  const processQuery = useCallback(async (query: string) => {
    const userMessage: ConversationMessage = {
      id: uuidv4(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const response = await servaAIFlow(query);
      const assistantMessage: ConversationMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
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
    openServaAI,
    closeServaAI,
    processQuery,
    clearConversation,
  }), [isOpen, messages, isProcessing, processQuery]);

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
