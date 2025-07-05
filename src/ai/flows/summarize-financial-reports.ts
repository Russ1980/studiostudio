// Summarizes financial reports, providing key insights, trends, and potential risks.
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFinancialReportsInputSchema = z.object({
  reportContent: z.string().describe('The content of the financial report to summarize.'),
});
export type SummarizeFinancialReportsInput = z.infer<
  typeof SummarizeFinancialReportsInputSchema
>;

const SummarizeFinancialReportsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key insights, trends, and potential risks in the financial report.'),
});
export type SummarizeFinancialReportsOutput = z.infer<
  typeof SummarizeFinancialReportsOutputSchema
>;

export async function summarizeFinancialReports(
  input: SummarizeFinancialReportsInput
): Promise<SummarizeFinancialReportsOutput> {
  return summarizeFinancialReportsFlow(input);
}

const summarizeFinancialReportsPrompt = ai.definePrompt({
  name: 'summarizeFinancialReportsPrompt',
  input: {
    schema: SummarizeFinancialReportsInputSchema,
  },
  output: {
    schema: SummarizeFinancialReportsOutputSchema,
  },
  prompt: `Summarize the following financial report, focusing on key insights, trends, and potential risks:\n\n{{{reportContent}}}`,
});

const summarizeFinancialReportsFlow = ai.defineFlow(
  {
    name: 'summarizeFinancialReportsFlow',
    inputSchema: SummarizeFinancialReportsInputSchema,
    outputSchema: SummarizeFinancialReportsOutputSchema,
  },
  async input => {
    const {output} = await summarizeFinancialReportsPrompt(input);
    return output!;
  }
);
