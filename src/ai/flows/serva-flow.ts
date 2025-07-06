
'use server';
/**
 * @fileOverview A conversational flow for the Serva AI assistant.
 *
 * - runServaAIFlow - A function that handles a user's query and returns a response.
 * - ServaAIOutput - The return type for the runServaAIFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getStockPrice } from '../tools/get-stock-price';

// Mock chart data for demonstration
const mockRevenueChartData = {
    type: 'chart',
    payload: {
        config: {
            revenue: { label: "Revenue", color: "hsl(var(--primary))" },
        },
        data: [
            { month: "Jan", revenue: 680000 },
            { month: "Feb", revenue: 720000 },
            { month: "Mar", revenue: 810000 },
            { month: "Apr", revenue: 790000 },
            { month: "May", revenue: 850000 },
            { month: "Jun", revenue: 920000 },
        ],
    }
};


const ServaAIOutputSchema = z.object({
    response: z.string().describe("The text-based response to the user's query."),
    data: z.optional(
        z.object({
            type: z.enum(['chart', 'table']).describe("The type of rich data to display."),
            payload: z.any().describe("The data payload for the chart or table."),
        })
    ).describe("Optional structured data for rich media rendering."),
});

export type ServaAIOutput = z.infer<typeof ServaAIOutputSchema>;

const servaAIFlow = ai.defineFlow(
  {
    name: 'servaAIFlow',
    inputSchema: z.string(),
    outputSchema: ServaAIOutputSchema,
  },
  async (query) => {
    // Simple logic to demonstrate rich media response.
    // In a real app, this would involve more sophisticated intent detection and data fetching.
    if (query.toLowerCase().includes('revenue trends')) {
        return {
            response: "Here are the revenue trends for the last six months. As you can see, there's a steady upward trend.",
            data: mockRevenueChartData
        };
    }

    const llmResponse = await ai.generate({
      prompt: `You are Serva AI, an expert financial assistant integrated into the Mardisen Suite. Your tone is professional, helpful, and concise. You can analyze data and provide insights.
      
      User query: "${query}"
      
      If the user's question asks about a public company's stock price, use the getStockPrice tool to get the current price and include it in your answer.`,
      tools: [getStockPrice]
    });

    return { response: llmResponse.text };
  }
);

export async function runServaAIFlow(query: string): Promise<ServaAIOutput> {
    return servaAIFlow(query);
}
