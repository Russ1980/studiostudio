
'use server';
/**
 * @fileOverview A tool for generating a sales report.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { firestore } from '@/lib/firebase-admin';

const SalesReportDataSchema = z.object({
  title: z.string(),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});
export type SalesReportData = z.infer<typeof SalesReportDataSchema>;

export const generateSalesReport = ai.defineTool(
  {
    name: 'generateSalesReport',
    description: 'Generates a sales report by customer for the current period.',
    inputSchema: z.object({}), // No input needed
    outputSchema: SalesReportDataSchema,
  },
  async () => {
    console.log('Generating sales report from Firestore...');
    if (!firestore) {
        throw new Error("Firestore not initialized.");
    }

    const customerSales: { [key: string]: { invoices: number; totalSales: number } } = {};

    const invoicesSnapshot = await firestore.collection('invoices').where('status', '==', 'Paid').get();
    
    invoicesSnapshot.forEach(doc => {
        const invoice = doc.data();
        const customerName = invoice.customer || 'Unknown Customer';
        const amount = parseFloat(invoice.amount.replace(/,/g, ''));

        if (!customerSales[customerName]) {
            customerSales[customerName] = { invoices: 0, totalSales: 0 };
        }
        
        customerSales[customerName].invoices += 1;
        customerSales[customerName].totalSales += amount;
    });

    const sortedCustomers = Object.entries(customerSales).sort(([, a], [, b]) => b.totalSales - a.totalSales);

    const rows = sortedCustomers.map(([customer, data]) => [
        customer,
        data.invoices.toString(),
        `$${data.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    ]);

    return {
        title: "Sales Report by Customer (YTD)",
        headers: ["Customer", "# of Invoices", "Total Sales"],
        rows: rows.length > 0 ? rows : [["No sales data available.", "", ""]],
    };
  }
);
