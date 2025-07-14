
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  RefreshCw,
  Download,
  Share2,
  Settings,
  Receipt,
  BarChart3,
  Bell,
  Users,
  Eye,
  Briefcase,
  SlidersHorizontal,
  Wand2,
  BarChart,
  ListChecks,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle,
  TrendingDown,
  BrainCircuit,
  Zap,
  GripVertical,
  Upload,
  FilePlus,
  Landmark,
  CreditCard,
  Activity,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar as RechartsBar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { mockDashboardPageData } from "@/lib/data";


const iconMap: { [key: string]: React.ElementType } = {
    BarChart, DollarSign, Wand2, Users, Eye, Briefcase, SlidersHorizontal,
    TrendingUp, BarChart3, Receipt, FilePlus, Landmark, CreditCard, Activity,
};

const DonutChartCard = ({ title, total, change, changeType, data }: { title: string, total: string, change?: string, changeType?: string, data: any[] }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription>
          <div className="text-2xl font-bold">{total}</div>
          {change && (
            <div className={cn("text-xs flex items-center gap-1", changeType === "increase" ? "text-success" : "text-destructive")}>
              {changeType === "increase" ? <TrendingUp className="h-3 w-3"/> : <TrendingDown className="h-3 w-3"/>} {change}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-40 w-full">
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={8} />
            </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
);

const ExecutiveOverviewView = ({ data }: { data: any }) => {
    const { 
        metricCards, 
        performanceMetrics, 
        alerts,
        chartData,
        shortcuts,
        expenseChartData,
        salesChartData,
        arChartData,
        apChartData,
        bankAccountsList
     } = data;
    const chartConfig = {
        income: { label: "Income", color: "hsl(var(--success))" },
        expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
        Sales: { label: "Sales", color: "hsl(var(--primary))" },
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricCards.map((card: any) => {
                const Icon = iconMap[card.icon];
                return (
                    <Card key={card.title}>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-muted rounded-md">
                                    {Icon && <Icon className="h-4 w-4 text-muted-foreground"/>}
                                </div>
                                <CardTitle className="text-base font-medium">{card.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{card.value}</p>
                            {card.details ? (
                                <p className="text-xs text-muted-foreground whitespace-pre-line">{card.details}</p>
                            ) : (
                                <p className={cn("text-xs text-muted-foreground", card.changeType === 'increase' ? 'text-success' : 'text-destructive')}>
                                vs last month {card.change}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                )
                })}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Profit & Loss</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-40 w-full">
                            <AreaChart data={chartData} margin={{ left: -20, right: 20 }}>
                                <defs>
                                    <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8} /><stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1} /></linearGradient>
                                    <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} /><stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1} /></linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Area dataKey="income" type="natural" fill="url(#fillIncome)" stroke="hsl(var(--success))" stackId="a" />
                                <Area dataKey="expenses" type="natural" fill="url(#fillExpenses)" stroke="hsl(var(--destructive))" stackId="b" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                 <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cash Flow</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-baseline"><span className="text-muted-foreground">Incoming</span><span className="font-bold text-lg text-success">{performanceMetrics.cashFlow.incoming}</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-muted-foreground">Outgoing</span><span className="font-bold text-lg text-destructive">{performanceMetrics.cashFlow.outgoing}</span></div>
                            <Separator/>
                            <div className="flex justify-between items-baseline"><span className="text-muted-foreground">Net Cash Flow</span><span className="font-bold text-lg">{performanceMetrics.cashFlow.net}</span></div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Alerts & Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {alerts.slice(0, 2).map((alert: any) => (
                                    <li key={alert.id} className="flex items-start gap-2">
                                        <AlertTriangle className="h-4 w-4 text-destructive mt-1 shrink-0"/>
                                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <Card>
                    <CardHeader><CardTitle className="text-base font-medium">Sales (Last 30 Days)</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{salesChartData.total}</p>
                        <ChartContainer config={chartConfig} className="h-32 w-full -ml-4">
                            <LineChart data={salesChartData.data} margin={{ top: 20, right: 10, bottom: 0, left: 10 }}>
                                <XAxis dataKey="name" hide/>
                                <YAxis domain={['dataMin - 100000', 'dataMax + 100000']} hide/>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel indicator="dot" />} />
                                <Line type="monotone" dataKey="Sales" stroke="var(--color-primary)" strokeWidth={2} dot={false}/>
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <DonutChartCard title="Accounts Receivable" total={arChartData.total} data={arChartData.breakdown} />
                <DonutChartCard title="Accounts Payable" total={apChartData.total} data={apChartData.breakdown} />
                <DonutChartCard title="Expenses" total={expenseChartData.total} change={expenseChartData.change} changeType={expenseChartData.changeType} data={expenseChartData.breakdown} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 <Card>
                    <CardHeader><CardTitle className="text-base font-medium">Bank Accounts</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {bankAccountsList.map((account: any, index: number) => {
                             const Icon = iconMap[account.icon];
                             return (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                                        <span className="text-sm font-medium">{account.name}</span>
                                    </div>
                                    <span className={cn("text-sm font-semibold", account.balance < 0 && "text-destructive")}>${account.balance.toLocaleString()}</span>
                                </div>
                             )
                        })}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-base font-medium">Shortcuts</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        {shortcuts.map((shortcut: any, index: number) => {
                            const Icon = iconMap[shortcut.icon];
                            return (
                                <Link key={index} href={shortcut.href}>
                                    <Button variant="ghost" className="flex flex-col h-auto p-3 items-center gap-2">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                                            {Icon && <Icon className="h-5 w-5 text-secondary-foreground" />}
                                        </div>
                                        <span className="text-xs font-medium">{shortcut.label}</span>
                                    </Button>
                                </Link>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

const FinancialHealthView = ({ data }: { data: any }) => {
    const chartConfigLine = { cashFlow: { label: "Cash Flow", color: "hsl(var(--primary))" } };
    const chartConfigBar = { profit: { label: "Profit", color: "hsl(var(--success))" }, loss: { label: "Loss", color: "hsl(var(--destructive))" } };
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.kpis.map((kpi: any) => (
            <Card key={kpi.title}>
              <CardHeader>
                <CardTitle className="text-base font-medium">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{kpi.value}</p>
                <p className="text-xs text-success">{kpi.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Trend</CardTitle>
              <CardDescription>Net cash flow over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigLine} className="h-64 w-full">
                <LineChart data={data.cashFlowData} margin={{ left: -20, right: 20 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickFormatter={(value) => `$${value}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="cashFlow" stroke="var(--color-cashFlow)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Profitability by Month</CardTitle>
              <CardDescription>Monthly profit and loss statement.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigBar} className="h-64 w-full">
                <RechartsBarChart data={data.profitabilityData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickFormatter={(value) => `$${value}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <RechartsBar dataKey="profit" fill="var(--color-profit)" radius={4} />
                  <RechartsBar dataKey="loss" fill="var(--color-loss)" radius={4} />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
};
  
const ServaAIInsightsView = ({ data }: { data: any }) => (
    <div className="grid gap-6">
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BrainCircuit className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle>AI-Powered Insights</CardTitle>
                    <CardDescription>Actionable insights based on your financial data, powered by Serva.</CardDescription>
                </div>
            </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.map((insight: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg bg-card">
                        <Wand2 className="h-5 w-5 text-primary mt-1 shrink-0"/>
                        <div>
                            <h4 className="font-semibold">{insight.type}</h4>
                            <p className="text-sm text-muted-foreground">{insight.summary}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
);

const WorkflowHubView = ({ data }: { data: any }) => (
    <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.kpis.map((kpi: any) => (
            <Card key={kpi.title}>
              <CardHeader>
                <CardTitle className="text-base font-medium">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Pending Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Task</TableHead><TableHead>Assigned To</TableHead><TableHead>Due</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {data.tasks.map((task: any) => (
                                <TableRow key={task.id}><TableCell>{task.name}</TableCell><TableCell>{task.assignee}</TableCell><TableCell>{task.due}</TableCell></TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Team Workload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.teamMembers.map((member: any) => (
                        <div key={member.name}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">{member.name}</span>
                                <span className="text-muted-foreground">{member.capacity}%</span>
                            </div>
                            <Progress value={member.capacity} />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
);
  
const ProcessVisibilityView = ({ data }: { data: any }) => {
    const chartConfig = { units: { label: "Units", color: "hsl(var(--primary))" }};
    return (
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.kpiData.map((kpi: any) => (
                <Card key={kpi.title}>
                    <CardHeader>
                        <CardTitle className="text-base font-medium">{kpi.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{kpi.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Production Plan Progress</CardTitle>
                <CardDescription>Real-time status of active production plans.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="h-64 w-full">
                    <RechartsBarChart data={data.productionPlanData} layout="vertical">
                        <CartesianGrid horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={120} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <RechartsBar dataKey="completed" fill="var(--color-units)" radius={4} stackId="a" />
                        <RechartsBar dataKey="remaining" fill="hsl(var(--muted))" radius={4} stackId="a" />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>
    );
};
  
const BusinessContextView = ({ data }: { data: any }) => {
    const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Industry Benchmarks</CardTitle>
                <CardDescription>How your key metrics stack up against the industry average.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div>
                    <h4 className="font-semibold text-sm mb-2">Revenue Growth (YoY)</h4>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground w-20">You</span>
                        <Progress value={data.competitorBenchmarks.revenueGrowth.self * 5} className="flex-1" />
                        <span className="font-bold">{data.competitorBenchmarks.revenueGrowth.self}%</span>
                    </div>
                     <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-muted-foreground w-20">Industry Avg.</span>
                        <Progress value={data.competitorBenchmarks.revenueGrowth.industry * 5} className="flex-1" />
                        <span className="font-bold">{data.competitorBenchmarks.revenueGrowth.industry}%</span>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-sm mb-2">Net Profit Margin</h4>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground w-20">You</span>
                        <Progress value={data.competitorBenchmarks.profitMargin.self * 5} className="flex-1" />
                        <span className="font-bold">{data.competitorBenchmarks.profitMargin.self}%</span>
                    </div>
                     <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-muted-foreground w-20">Industry Avg.</span>
                        <Progress value={data.competitorBenchmarks.profitMargin.industry * 5} className="flex-1" />
                        <span className="font-bold">{data.competitorBenchmarks.profitMargin.industry}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Market Trends</CardTitle>
                <CardDescription>Key trends shaping your industry right now.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {data.marketTrends.map((trend: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                            <TrendingUp className="h-4 w-4 text-primary mt-1" />
                            <span className="text-sm text-muted-foreground">{trend}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>
    );
};

const CustomizeDashboardView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Dashboard Widgets</CardTitle>
                    <CardDescription>Toggle the visibility of dashboard components.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2">KPI Cards</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="kpi-expenses">Monthly Expenses</Label>
                                <Switch id="kpi-expenses" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="kpi-profit">Net Profit</Label>
                                <Switch id="kpi-profit" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="kpi-sales">Sales (30 Days)</Label>
                                <Switch id="kpi-sales" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="kpi-ar">A/R Total</Label>
                                <Switch id="kpi-ar" />
                            </div>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Charts & Tables</h4>
                        <div className="space-y-3">
                             <div className="flex items-center justify-between">
                                <Label htmlFor="chart-pl">Profit & Loss Chart</Label>
                                <Switch id="chart-pl" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="table-cashflow">Cash Flow Table</Label>
                                <Switch id="table-cashflow" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="table-ar">Accounts Receivable Table</Label>
                                <Switch id="table-ar" disabled />
                            </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="alerts">Alerts & Notifications</Label>
                                <Switch id="alerts" defaultChecked />
                            </div>
                        </div>
                    </div>
                    <Separator />
                     <div>
                        <h4 className="font-semibold mb-2">Appearance</h4>
                         <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start"><Upload className="mr-2 h-4 w-4" /> Upload background image</Button>
                        </div>
                     </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle>Live Layout Preview</CardTitle>
                    <CardDescription>This is a representation of your dashboard layout. Drag to reorder.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 bg-muted/50 rounded-lg space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24 opacity-50" />
                    </div>
                     <div className="p-4 border rounded-lg bg-card flex items-center gap-4">
                        <GripVertical className="text-muted-foreground" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-40 w-full" />
                        </div>
                         <Button variant="ghost" size="icon"><Eye className="text-muted-foreground"/></Button>
                    </div>
                     <div className="p-4 border rounded-lg bg-card flex items-center gap-4">
                        <GripVertical className="text-muted-foreground" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                         <Button variant="ghost" size="icon"><Eye className="text-muted-foreground"/></Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);

export function DashboardClientPage({ initialData }: { initialData: any }) {
    const { toast } = useToast();
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

    if (!initialData || !initialData.user) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }
    
    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarSrc(e.target?.result as string);
                toast({
                    title: "Profile Photo Updated",
                    description: "Your new photo has been uploaded successfully.",
                });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const data = initialData || mockDashboardPageData;
    const { user, mainKpis, navItems } = data;
    const [activeView, setActiveView] = useState('Executive Overview');

    const renderView = () => {
        switch (activeView) {
            case 'Executive Overview':
                return <ExecutiveOverviewView data={data} />;
            case 'Financial Health':
                return <FinancialHealthView data={data.financialHealthData} />;
            case 'Serva AI Insights':
                return <ServaAIInsightsView data={data.servaAiInsightsData} />;
            case 'Workflow Hub':
                return <WorkflowHubView data={data.workflowHubData} />;
            case 'Process Visibility':
                return <ProcessVisibilityView data={data.processVisibilityData} />;
            case 'Business Context':
                return <BusinessContextView data={data.businessContextData} />;
            case 'Customize Dashboard':
                return <CustomizeDashboardView />;
            default:
                return <ExecutiveOverviewView data={data} />;
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                    <label htmlFor="avatar-upload" className="cursor-pointer group relative">
                        <Avatar className="h-14 w-14">
                            <AvatarImage src={avatarSrc || undefined} alt={user.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-2xl group-hover:bg-primary/80 transition-colors">
                                {user.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Upload className="h-6 w-6 text-white" />
                        </div>
                        <input id="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handleAvatarUpload} />
                    </label>
                    <div>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-muted-foreground">{user.title}</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right sm:text-left">
                        <p className="text-2xl font-bold">{mainKpis.netRevenue}</p>
                        <p className="text-sm text-muted-foreground">Net Revenue</p>
                    </div>
                    <div className="text-right sm:text-left">
                        <p className="text-2xl font-bold text-success">{mainKpis.growth}</p>
                        <p className="text-sm text-muted-foreground">Growth</p>
                    </div>
                    <div className="text-right sm:text-left">
                        <p className="text-2xl font-bold text-primary">{mainKpis.healthScore}</p>
                        <p className="text-sm text-muted-foreground">Health Score</p>
                    </div>
                    <Separator orientation="vertical" className="h-10 hidden sm:block" />
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon"><RefreshCw className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <div className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive border-2 border-background" />
                        </Button>
                    </div>
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                    {navItems.map((item: any) => {
                    const NavIcon = iconMap[item.icon];
                    const isActive = activeView === item.title;
                    return (
                        <button
                        key={item.title}
                        onClick={() => setActiveView(item.title)}
                        className={cn(
                            "flex flex-col items-start gap-1 p-4 text-left transition-colors hover:bg-muted/50",
                            isActive && "bg-primary/5",
                            "border-r"
                        )}
                        >
                        {NavIcon && <NavIcon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />}
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                        </button>
                    );
                    })}
                </div>
                </CardContent>
            </Card>

            {renderView()}
        </div>
    );
}
