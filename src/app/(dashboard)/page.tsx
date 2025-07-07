
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { getMockUser } from "@/lib/auth";
import { OnboardingController } from "@/components/onboarding/onboarding-controller";
import { DevTools } from "@/components/development/dev-tools";
import { useEffect, useState } from "react";
import type { User } from "@/lib/auth";
import {
  DollarSign,
  TrendingUp,
  RefreshCw,
  Download,
  Share2,
  Settings,
  PlusCircle,
  Receipt,
  ArrowRight,
  BarChart3,
  HeartPulse,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMockUser().then(setUser);
  }, []);

  const chartData = [
      { month: 'Jan', income: 186000, expenses: 80000 },
      { month: 'Feb', income: 305000, expenses: 200000 },
      { month: 'Mar', income: 237000, expenses: 120000 },
      { month: 'Apr', income: 273000, expenses: 190000 },
      { month: 'May', income: 209000, expenses: 130000 },
      { month: 'Jun', income: 214000, expenses: 140000 },
  ];
  
  const recentActivity = [
      { description: "Invoice #1024 paid by Apex Solutions.", time: "2m ago" },
      { description: "Payroll for June 2024 processed successfully.", time: "1h ago" },
      { description: "New client 'Stellar Goods' added.", time: "3h ago" },
      { description: "Q2 Financial Report generated.", time: "1d ago" },
  ];

  const quickActions = [
      { label: "New Transaction", icon: PlusCircle },
      { label: "Create Invoice", icon: Receipt },
      { label: "Record Payment", icon: DollarSign },
      { label: "Run Report", icon: BarChart3 }
  ];

  if (!user) {
    return (
        <div className="flex flex-col gap-6">
            <Card><CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent></Card>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2"><Skeleton className="h-80 w-full" /></div>
                <div className="lg:col-span-1 space-y-6">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <OnboardingController userRole={user.role.toLowerCase()} />
      <DevTools />

      <Card data-onboarding="dashboard-kpis">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold">$2.1M</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end sm:justify-start text-success"><TrendingUp className="h-4 w-4"/> Net Revenue</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold text-success">+12.4%</p>
                <p className="text-sm text-muted-foreground">Growth</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold text-primary">94%</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end sm:justify-start"><HeartPulse className="h-4 w-4"/> Health Score</p>
              </div>
              <Separator orientation="vertical" className="h-10 hidden sm:block" />
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon"><RefreshCw className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                income: { label: "Income", color: "hsl(var(--primary))" },
                expenses: { label: "Expenses", color: "hsl(var(--secondary))" },
              }} className="h-64 w-full">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {quickActions.map(action => {
                const Icon = action.icon;
                return <Button key={action.label} variant="outline" className="justify-start"><Icon className="mr-2 h-4 w-4" />{action.label}</Button>
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-start justify-between text-sm">
                    <p className="text-muted-foreground pr-4">{activity.description}</p>
                    <p className="text-muted-foreground whitespace-nowrap">{activity.time}</p>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="w-full mt-4 justify-center">
                View All Activity <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

