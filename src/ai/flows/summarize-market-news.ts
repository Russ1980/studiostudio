'use server';
/**
 * @fileOverview Summarizes market news articles or reports, providing key events, trends, and potential market impacts.
 *
 * - summarizeMarketNews - A function that summarizes market news.
 * - SummarizeMarketNewsInput - The input type for the summarizeMarketNews function.
 * - SummarizeMarketNewsOutput - The return type for the summarizeMarketNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMarketNewsInputSchema = z.object({
  articleContent: z.string().describe('The content of the market news article or report to summarize.'),
});

export type SummarizeMarketNewsInput = z.infer<typeof SummarizeMarketNewsInputSchema>;

const SummarizeMarketNewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key events, trends, and potential market impacts.'),
});

export type SummarizeMarketNewsOutput = z.infer<typeof SummarizeMarketNewsOutputSchema>;

export async function summarizeMarketNews(input: SummarizeMarketNewsInput): Promise<SummarizeMarketNewsOutput> {
  return summarizeMarketNewsFlow(input);
}

const summarizeMarketNewsPrompt = ai.definePrompt({
  name: 'summarizeMarketNewsPrompt',
  input: {schema: SummarizeMarketNewsInputSchema},
  output: {schema: SummarizeMarketNewsOutputSchema},
  prompt: `You are an expert financial analyst. Please summarize the following market news article or report, identifying the key events, trends, and potential market impacts.  Provide a concise and easily understandable summary.

Article Content:
{{{articleContent}}}`,
});

const summarizeMarketNewsFlow = ai.defineFlow(
  {
    name: 'summarizeMarketNewsFlow',
    inputSchema: SummarizeMarketNewsInputSchema,
    outputSchema: SummarizeMarketNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeMarketNewsPrompt(input);
    return output!;
  }
);
