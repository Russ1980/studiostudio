
'use server';
/**
 * @fileOverview A tool for fetching the current stock price of a given ticker symbol.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const getStockPrice = ai.defineTool(
  {
    name: 'getStockPrice',
    description: "Returns the current market value of a public company's stock.",
    inputSchema: z.object({
      ticker: z.string().describe('The stock ticker symbol of the company, e.g., AAPL for Apple.'),
    }),
    outputSchema: z.number(),
  },
  async ({ ticker }) => {
    console.log(`Fetching stock price for: ${ticker}`);
    // In a real application, you would call a financial data API here.
    // For now, we'll return a mock price based on the ticker.
    const mockPrices: { [key: string]: number } = {
        'AAPL': 172.25,
        'GOOGL': 155.50,
        'MSFT': 420.72,
        'TSLA': 180.01,
        'NVDA': 950.02,
    };
    return mockPrices[ticker.toUpperCase()] || Math.floor(Math.random() * 1000) + 100;
  }
);
