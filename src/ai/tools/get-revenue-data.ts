
'use server';
/**
 * @fileOverview A tool for fetching revenue trend data.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { firestore } from '@/lib/firebase-admin';

const RevenueDataSchema = z.object({
  config: z.object({
    revenue: z.object({
      label: z.string(),
      color: z.string(),
    }),
  }),
  data: z.array(z.object({
    month: z.string(),
    revenue: z.number(),
  })),
});
export type RevenueData = z.infer<typeof RevenueDataSchema>;

export const getRevenueDataTool = ai.defineTool(
  {
    name: 'getRevenueDataTool',
    description: 'Fetches monthly revenue data for the last six months to show trends. Use this when the user asks about revenue trends or monthly revenue.',
    inputSchema: z.object({}), // No input needed
    outputSchema: RevenueDataSchema,
  },
  async () => {
    if (!firestore) {
        throw new Error("Firestore not initialized.");
    }
    
    const revenueByMonth: { [key: string]: number } = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    
    // Set a start date 6 months ago
    const startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);

    const invoicesSnapshot = await firestore.collection('invoices')
                                          .where('status', '==', 'Paid')
                                          .get();
    
    invoicesSnapshot.forEach(doc => {
        const invoice = doc.data();
        if (typeof invoice.dueDate !== 'string' || typeof invoice.amount !== 'string') {
            return;
        }
        const dueDate = new Date(invoice.dueDate);
        if (dueDate >= startDate && dueDate <= today) {
            const monthName = monthNames[dueDate.getMonth()];
            const year = dueDate.getFullYear();
            const key = `${year}-${dueDate.getMonth()}-${monthName}`; // Key includes year/month for sorting

            const amount = parseFloat(invoice.amount.replace(/,/g, ''));
            if (!isNaN(amount)) {
                if (!revenueByMonth[key]) {
                    revenueByMonth[key] = 0;
                }
                revenueByMonth[key] += amount;
            }
        }
    });

    const sortedKeys = Object.keys(revenueByMonth).sort((a, b) => {
        const [yearA, monthA] = a.split('-').map(Number);
        const [yearB, monthB] = b.split('-').map(Number);
        if (yearA !== yearB) return yearA - yearB;
        return monthA - monthB;
    });

    const chartData = sortedKeys.map(key => {
        const [,, monthName] = key.split('-');
        return { month: monthName, revenue: Math.round(revenueByMonth[key]) };
    });

    // If there is no data, return a default empty state for the last 6 months
    if (chartData.length === 0) {
        const emptyData = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            emptyData.push({ month: monthNames[d.getMonth()], revenue: 0 });
        }
        return {
            config: { revenue: { label: "Revenue", color: "hsl(var(--primary))" } },
            data: emptyData
        };
    }

    return {
      config: {
        revenue: { label: "Revenue", color: "hsl(var(--primary))" },
      },
      data: chartData,
    };
  }
);
