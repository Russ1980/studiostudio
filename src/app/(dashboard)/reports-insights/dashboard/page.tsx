
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { DollarSign, BarChart2, Wand2, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const kpiData = [
  { title: "YTD Revenue", value: "$8.2M" },
  { title: "Gross Profit Margin", value: "62.5%" },
  { title: "Net Profit Margin", value: "18.9%" },
  { title: "Customer LTV", value: "$12,450" },
];

const revenueData = [
  { month: "Jan", revenue: 680000 },
  { month: "Feb", revenue: 720000 },
  { month: "Mar", revenue: 810000 },
  { month: "Apr", revenue: 790000 },
  { month: "May", revenue: 850000 },
  { month: "Jun", revenue: 920000 },
];

const expenseData = [
    { category: "Salaries", amount: 450000 },
    { category: "Marketing", amount: 120000 },
    { category: "COGS", amount: 600000 },
    { category: "R&D", amount: 210000 },
    { category: "Overhead", amount: 85000 },
];

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  amount: { label: "Amount", color: "hsl(var(--chart-2))" },
};

export default function ReportsDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Insights Dashboard</h1>
          <p className="text-muted-foreground">
            A holistic and deep understanding of business performance.
          </p>
        </div>
        <Button asChild>
            <Link href="/reports-insights/builder"><SlidersHorizontal /> Custom Report Builder</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Revenue YTD</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <LineChart data={revenueData} margin={{ left: 10, right: 10 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false}/>
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-72 w-full">
                <BarChart data={expenseData} layout="vertical" margin={{ left: 10, right: 10 }}>
                    <CartesianGrid horizontal={false} />
                    <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} tickMargin={10} width={80} />
                    <XAxis type="number" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

       <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wand2 className="h-6 w-6" />
            </div>
            <div>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>Actionable insights based on your financial data, powered by Genkit.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
                <BarChart2 className="h-5 w-5 text-primary mt-1 shrink-0"/>
                <div>
                    <h4 className="font-semibold">Trend Analysis</h4>
                    <p className="text-sm text-muted-foreground">Your marketing spend increased by 15% in Q2, while revenue from new customers grew by 8%. Consider analyzing campaign effectiveness to improve ROI.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <BarChart2 className="h-5 w-5 text-primary mt-1 shrink-0"/>
                <div>
                    <h4 className="font-semibold">Anomaly Detection</h4>
                    <p className="text-sm text-muted-foreground">Utility expenses for June were 35% higher than the monthly average. This may indicate a billing error or an operational issue worth investigating.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <BarChart2 className="h-5 w-5 text-primary mt-1 shrink-0"/>
                <div>
                    <h4 className="font-semibold">Cash Flow Forecast</h4>
                    <p className="text-sm text-muted-foreground">Based on current revenue trends and projected expenses, we forecast a cash surplus of approximately $250,000 by the end of Q3.</p>
                </div>
            </div>
        </CardContent>
       </Card>
    </div>
  );
}
