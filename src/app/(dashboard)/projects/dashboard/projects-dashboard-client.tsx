
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
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { Activity, DollarSign, Clock, ListChecks, PlusCircle } from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";

const chartConfig = {
  budget: { label: "Budget", color: "hsl(var(--chart-2))" },
  actual: { label: "Actual", color: "hsl(var(--primary))" },
};

const iconMap: { [key: string]: ElementType } = {
    Activity,
    DollarSign,
    Clock,
    ListChecks
};

export function ProjectsDashboardClientPage({ initialData }: { initialData: any }) {
  const { kpiData, projectBudgetData, recentTimeLogs } = initialData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects Dashboard</h1>
          <p className="text-muted-foreground">
            An overview of project health, financials, and team productivity.
          </p>
        </div>
        <Button asChild>
            <Link href="/projects/all-projects"><PlusCircle className="mr-2"/> Create New Project</Link>
        </Button>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi: any) => {
          const Icon = iconMap[kpi.icon];
          return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${kpi.isPositive === true ? 'text-success' : kpi.isPositive === false ? 'text-destructive' : ''}`}>
                {kpi.value}
              </div>
            </CardContent>
          </Card>
        )})}
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Budget vs. Actual</CardTitle>
            <CardDescription>Track project spending against the allocated budget.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-80 w-full">
                <BarChart data={projectBudgetData} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={10} width={120} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
                    <Bar dataKey="actual" fill="var(--color-actual)" radius={4} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Time Logs</CardTitle>
            <CardDescription>Latest time entries from your team.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Hours</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentTimeLogs.map((log: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{log.employee}</TableCell>
                            <TableCell>{log.project}</TableCell>
                            <TableCell>{log.hours}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
             </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
