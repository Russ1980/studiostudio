
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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { getDashboardPageData } from "@/lib/actions";
import { OnboardingController } from "@/components/onboarding/onboarding-controller";
import { DevTools } from "@/components/development/dev-tools";
import { useEffect, useState } from "react";
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
  AlertTriangle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any | null>(null);

  useEffect(() => {
    getDashboardPageData().then(setDashboardData);
  }, []);

  if (!dashboardData) {
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
             <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
             <Skeleton className="h-48 w-full" />
        </div>
    );
  }

  const { user, chartData, recentActivity, quickActions, performanceMetrics, alerts } = dashboardData;

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

       <Tabs defaultValue="executive" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="executive">Executive Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Health</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="executive" className="mt-6">
            <div className="flex flex-col gap-6">
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
                        {quickActions.map((action: any) => {
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
                            {recentActivity.map((activity: any, index: number) => (
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

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-medium">Profit &amp; Loss</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-2xl font-bold">{performanceMetrics.profitLoss.ytd}</p>
                            <p className="text-xs text-muted-foreground">
                                <span className={cn(performanceMetrics.profitLoss.changeType === "up" ? 'text-success' : 'text-destructive')}>
                                    {performanceMetrics.profitLoss.change}
                                </span> vs last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-medium">Cash Flow</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-2xl font-bold">{performanceMetrics.cashFlow.net}</p>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-success">{performanceMetrics.cashFlow.incoming}</span> in, <span className="text-destructive">{performanceMetrics.cashFlow.outgoing}</span> out
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-medium">Accounts Receivable</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-2xl font-bold">{performanceMetrics.accountsReceivable.outstanding}</p>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-destructive">{performanceMetrics.accountsReceivable.overdue}</span> overdue
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Alerts &amp; Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {alerts.map((alert: any) => (
                                <li key={alert.id} className="flex items-start gap-3">
                                    <AlertTriangle className={cn("h-5 w-5 mt-0.5", alert.type === 'critical' ? 'text-destructive' : 'text-yellow-500')} />
                                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
         <TabsContent value="financial" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Financial Health</CardTitle>
                    <CardDescription>A deep dive into your financial stability and performance.</CardDescription>
                </CardHeader>
                <CardContent className="h-96 flex items-center justify-center">
                    <p className="text-muted-foreground">Financial Health dashboard coming soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="ai" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>AI-Powered Insights</CardTitle>
                    <CardDescription>Actionable insights and forecasts generated by Serva AI.</CardDescription>
                </CardHeader>
                 <CardContent className="h-96 flex items-center justify-center">
                    <p className="text-muted-foreground">AI Insights dashboard coming soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
