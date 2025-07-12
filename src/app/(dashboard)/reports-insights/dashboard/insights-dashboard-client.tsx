
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Bar, BarChart, ResponsiveContainer } from "recharts";
import { BrainCircuit, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import type { GenerateDashboardInsightsOutput, GenerateDashboardInsightsInput } from "@/ai/flows/generate-dashboard-insights";

const iconMap: { [key: string]: React.ElementType } = {
  "Trend Analysis": TrendingUp,
  "Anomaly Detection": AlertTriangle,
  "Key Highlight": Lightbulb,
  "Cash Flow Forecast": Lightbulb,
};

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
};

export function InsightsDashboardClient({ 
  insights,
  revenueData,
  expenseData
}: { 
  insights: GenerateDashboardInsightsOutput["insights"];
  revenueData: GenerateDashboardInsightsInput["revenueData"];
  expenseData: GenerateDashboardInsightsInput["expenseData"];
}) {
  return (
    <div className="grid gap-6">
       <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><BrainCircuit/> Insights Dashboard</h1>
        <p className="text-muted-foreground">
          Actionable insights based on your financial data, powered by Serva AI.
        </p>
      </div>
      
       <div className="grid gap-6 lg:grid-cols-3">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.type];
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                {Icon && <Icon className="h-6 w-6 text-primary" />}
                <CardTitle className="text-lg">{insight.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{insight.summary}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Trend (Last 6 Months)</CardTitle>
                    <CardDescription>A visual representation of the revenue data analyzed by the AI.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-64 w-full">
                        <AreaChart data={revenueData} margin={{ left: -10, right: 10, top: 5, bottom: 0 }}>
                            <defs>
                                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Area dataKey="revenue" type="natural" fill="url(#fillRevenue)" stroke="var(--color-revenue)" strokeWidth={2} dot />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                    <CardDescription>A visual representation of the expense data analyzed by the AI.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-64 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={expenseData} layout="vertical" margin={{ left: 10, right: 10, top: 5, bottom: 0 }}>
                                <CartesianGrid horizontal={false} />
                                <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} width={80} />
                                <XAxis type="number" hide />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Bar dataKey="amount" fill="var(--color-revenue)" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
