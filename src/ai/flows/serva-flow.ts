
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
import { generateSalesReport } from '../tools/generate-sales-report';
import { getRevenueDataTool } from '../tools/get-revenue-data';


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
    const llmResponse = await ai.generate({
      prompt: `You are Serva AI, an expert financial assistant integrated into the Mardisen Suite. Your tone is professional, helpful, and concise. You can analyze data, provide insights, and generate reports.
      
      User query: "${query}"
      
      Instructions:
      - If the user's question asks about a public company's stock price, use the getStockPrice tool to get the current price and include it in your answer.
      - If the user asks for a sales report, use the generateSalesReport tool. When you use this tool, place its full output into the 'data.payload' field and set 'data.type' to 'table'. Your text 'response' should be a brief confirmation, like "Here is the sales report you requested."
      - If the user asks about revenue trends or monthly revenue, use the getRevenueDataTool. When you use this tool, place its full output into the 'data.payload' field and set 'data.type' to 'chart'. Your text 'response' should be a brief summary of the trend.
      - For all other queries, provide a text-based response.`,
      tools: [getStockPrice, generateSalesReport, getRevenueDataTool],
      output: { schema: ServaAIOutputSchema, format: 'json' },
    });

    return llmResponse.output!;
  }
);

export async function runServaAIFlow(query: string): Promise<ServaAIOutput> {
    return servaAIFlow(query);
}
