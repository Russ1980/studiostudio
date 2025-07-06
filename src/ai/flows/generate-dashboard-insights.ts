
'use server';
/**
 * @fileOverview Generates high-level financial insights for a dashboard.
 *
 * - generateDashboardInsights - A function that analyzes financial data and returns key insights.
 * - GenerateDashboardInsightsInput - The input type for the function.
 * - GenerateDashboardInsightsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateDashboardInsightsInputSchema = z.object({
  revenueData: z.array(z.object({ month: z.string(), revenue: z.number() })).describe("Array of monthly revenue data."),
  expenseData: z.array(z.object({ category: z.string(), amount: z.number() })).describe("Array of expense data by category."),
});
export type GenerateDashboardInsightsInput = z.infer<typeof GenerateDashboardInsightsInputSchema>;

const InsightSchema = z.object({
    type: z.enum(["Trend Analysis", "Anomaly Detection", "Cash Flow Forecast", "Key Highlight"]).describe("The category of the insight."),
    summary: z.string().describe("A concise, one to two-sentence summary of the insight."),
});

export const GenerateDashboardInsightsOutputSchema = z.object({
    insights: z.array(InsightSchema).describe("An array of 2-3 key financial insights."),
});
export type GenerateDashboardInsightsOutput = z.infer<typeof GenerateDashboardInsightsOutputSchema>;

export async function generateDashboardInsights(input: GenerateDashboardInsightsInput): Promise<GenerateDashboardInsightsOutput> {
  return generateDashboardInsightsFlow(input);
}

const generateDashboardInsightsPrompt = ai.definePrompt({
  name: 'generateDashboardInsightsPrompt',
  input: { schema: GenerateDashboardInsightsInputSchema },
  output: { schema: GenerateDashboardInsightsOutputSchema },
  prompt: `You are an expert financial analyst AI. Your task is to analyze the provided revenue and expense data and generate 2-3 high-level, actionable insights for a business owner's dashboard.

Focus on identifying significant trends, anomalies, or key takeaways. Be concise and professional.

Revenue Data (by month):
{{#each revenueData}}
- {{month}}: \${{revenue}}
{{/each}}

Expense Data (by category):
{{#each expenseData}}
- {{category}}: \${{amount}}
{{/each}}

Based on this data, provide your top insights.
`,
});

const generateDashboardInsightsFlow = ai.defineFlow(
  {
    name: 'generateDashboardInsightsFlow',
    inputSchema: GenerateDashboardInsightsInputSchema,
    outputSchema: GenerateDashboardInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await generateDashboardInsightsPrompt(input);
    return output!;
  }
);
