"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  CheckSquare,
  DollarSign,
  Activity,
  FileText,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const kpiData = [
  {
    title: "Active Clients",
    value: "73",
    change: "+3 since last month",
    icon: Users,
  },
  {
    title: "Pending Tasks",
    value: "12",
    change: "2 overdue",
    icon: CheckSquare,
  },
  {
    title: "Revenue YTD",
    value: "$1.2M",
    change: "+15% vs last year",
    changeType: "up",
    icon: DollarSign,
  },
  {
    title: "Client Health",
    value: "92%",
    change: "Avg. Satisfaction",
    icon: Activity,
  },
];

const chartData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 2900 },
  { month: "May", revenue: 6100 },
  { month: "Jun", revenue: 5400 },
  { month: "Jul", revenue: 4800 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
};

const upcomingDeadlines = [
    { title: "Q2 Tax Filing", client: "Innovate Inc.", deadline: "3 days", isUrgent: true },
    { title: "Payroll Run", client: "Apex Solutions", deadline: "5 days", isUrgent: true },
    { title: "Financial Statements Review", client: "QuantumLeap Co.", deadline: "1 week", isUrgent: false },
    { title: "Invoice #1024 Due", client: "Stellar Goods", deadline: "2 weeks", isUrgent: false },
];

export default function AccountantPortalPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Accountant Portal Dashboard</h1>
        <p className="text-muted-foreground">
          A central hub for managing your clients and firm operations.
        </p>
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
              <p className={`text-xs ${kpi.changeType === "up" ? 'text-success' : 'text-muted-foreground'}`}>
                {kpi.changeType === 'up' && '↑ '}
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Client Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue from all clients.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 5,
                  left: -10,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `$${Number(value) / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Critical tasks needing attention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <FileText className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-sm text-muted-foreground">{deadline.client}</p>
                    </div>
                    <div className={`font-medium text-sm ${deadline.isUrgent ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {deadline.deadline}
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
