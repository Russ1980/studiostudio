
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
  Banknote,
  Receipt,
  CreditCard,
  DollarSign,
  PlusCircle,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const kpiData = [
  {
    title: "Bank Accounts",
    value: "$1,250,320.50",
    detail: "Total cash balance",
    icon: Banknote,
  },
  {
    title: "Accounts Receivable",
    value: "$245,800.00",
    detail: "$35,200.00 overdue",
    icon: Receipt,
  },
  {
    title: "Accounts Payable",
    value: "$88,450.00",
    detail: "$15,000.00 due soon",
    icon: CreditCard,
  },
  {
    title: "YTD Profit",
    value: "$430,100.00",
    detail: "+18% vs last year",
    icon: DollarSign,
  },
];

const chartData = [
  { month: "Jan", inflow: 120000, outflow: 80000 },
  { month: "Feb", inflow: 150000, outflow: 95000 },
  { month: "Mar", inflow: 135000, outflow: 100000 },
  { month: "Apr", inflow: 160000, outflow: 110000 },
  { month: "May", inflow: 180000, outflow: 125000 },
  { month: "Jun", inflow: 175000, outflow: 115000 },
];

const chartConfig = {
  inflow: { label: "Inflow", color: "hsl(var(--success))" },
  outflow: { label: "Outflow", color: "hsl(var(--destructive))" },
};

const recentActivity = [
    { description: "Invoice #INV-2024-050 paid by Apex Solutions", amount: "+$12,500.00", isIncome: true },
    { description: "Bill #B-2024-112 paid to Office Supplies Inc.", amount: "-$1,200.00", isIncome: false },
    { description: "Expense logged for 'Team Lunch'", amount: "-$350.00", isIncome: false },
    { description: "Invoice #INV-2024-051 created for QuantumLeap Co.", amount: "+$25,000.00", isIncome: true },
];

export default function AccountingDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounting Dashboard</h1>
          <p className="text-muted-foreground">
            A real-time financial snapshot of your business.
          </p>
        </div>
        <Button><PlusCircle />New Transaction</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Cash Flow</CardTitle>
            <CardDescription>Monthly inflow vs. outflow.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="inflow" fill="var(--color-inflow)" radius={4} />
                <Bar dataKey="outflow" fill="var(--color-outflow)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest financial transactions.</CardDescription>
          </CardHeader>
          <CardContent>
             <ul className="space-y-4">
                {recentActivity.map((activity, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{activity.description}</span>
                        <span className={`text-sm font-medium ${activity.isIncome ? 'text-success' : 'text-foreground'}`}>{activity.amount}</span>
                    </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
