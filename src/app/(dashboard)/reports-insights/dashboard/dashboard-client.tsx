
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

interface Insight {
    type: string;
    summary: string;
}

interface DashboardClientPageProps {
  insights?: Insight[];
  revenueData?: any;
  expenseData?: any;
}

export function DashboardClientPage({ 
  insights, 
  revenueData, 
  expenseData 
}: DashboardClientPageProps) {
  return (
    <div className="grid gap-6">
        <div>
            <h1 className="text-3xl font-bold">AI-Powered Dashboard</h1>
            <p className="text-muted-foreground">
                An overview of your financial data with actionable insights from Serva AI.
            </p>
        </div>
      
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Last 6 months of revenue data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <pre className="text-xs p-4 bg-muted rounded-md">{JSON.stringify(revenueData, null, 2)}</pre>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Expense Overview</CardTitle>
                     <CardDescription>Breakdown of expenses by category.</CardDescription>
                </CardHeader>
                <CardContent>
                    <pre className="text-xs p-4 bg-muted rounded-md">{JSON.stringify(expenseData, null, 2)}</pre>
                </CardContent>
            </Card>
        </div>

        {insights && insights.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Wand2/> AI Generated Insights</CardTitle>
                    <CardDescription>Serva AI has analyzed your data and found the following insights.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {insights.map((insight, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-secondary/50">
                            <h4 className="font-semibold">{insight.type}</h4>
                            <p className="text-sm text-muted-foreground">{insight.summary}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )}
    </div>
  );
}
