
'use server';
/**
 * @fileOverview A conversational flow for the Serva AI assistant.
 *
 * - servaAIFlow - A function that handles a user's query and returns a response.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const servaAIFlow = ai.defineFlow(
  {
    name: 'servaAIFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (query) => {
    const llmResponse = await ai.generate({
      prompt: `You are Serva AI, an expert financial assistant integrated into the Mardisen Suite. Your tone is professional, helpful, and concise.
      
      User query: "${query}"`,
    });

    return llmResponse.text;
  }
);
