
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface Insight {
    type: string;
    summary: string;
}

interface DashboardClientPageProps {
  insights?: Insight[];
  revenueData?: any[];
  expenseData?: any[];
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--success))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--destructive))",
  },
};

export function DashboardClientPage({ 
  insights, 
  revenueData, 
  expenseData 
}: DashboardClientPageProps) {
  
  const chartData = revenueData?.map((item, index) => ({
    ...item,
    expenses: expenseData?.[index]?.amount || 0,
  }));

  return (
    <div className="grid gap-6">
        <div>
            <h1 className="text-3xl font-bold">AI-Powered Dashboard</h1>
            <p className="text-muted-foreground">
                An overview of your financial data with actionable insights from Serva AI.
            </p>
        </div>
      
        <Card>
            <CardHeader>
                <CardTitle>Revenue vs. Expenses</CardTitle>
                <CardDescription>Last 6 months of revenue and expense data.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="h-72 w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                     <defs>
                        <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-revenue)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-revenue)"
                            stopOpacity={0.1}
                        />
                        </linearGradient>
                        <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="var(--color-expenses)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-expenses)"
                            stopOpacity={0.1}
                        />
                        </linearGradient>
                    </defs>
                    <Area
                        dataKey="revenue"
                        type="natural"
                        fill="url(#fillRevenue)"
                        stroke="var(--color-revenue)"
                        stackId="a"
                    />
                     <Area
                        dataKey="expenses"
                        type="natural"
                        fill="url(#fillExpenses)"
                        stroke="var(--color-expenses)"
                        stackId="b"
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>

        {insights && insights.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Wand2/> AI Generated Insights</CardTitle>
                    <CardDescription>Serva AI has analyzed your data and found the following insights.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    {insights.map((insight, index) => (
                        <Card key={index} className="bg-secondary/50">
                            <CardHeader>
                                <CardTitle className="text-base">{insight.type}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{insight.summary}</p>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        )}
    </div>
  );
}
