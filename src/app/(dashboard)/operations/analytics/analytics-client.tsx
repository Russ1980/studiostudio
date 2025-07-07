
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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import { Download, BarChart2 } from "lucide-react";

const chartConfig = {
  utilization: { label: "Utilization", color: "hsl(var(--primary))" },
  planned: { label: "Planned", color: "hsl(var(--chart-2))" },
  actual: { label: "Actual", color: "hsl(var(--primary))" },
};

export function AnalyticsClientPage({ analyticsData }: { analyticsData: any }) {
  if (!analyticsData) {
    return <div>Loading analytics...</div>;
  }
  
  const { resourceData, efficiencyData } = analyticsData;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Operations Reporting & Analysis</h1>
        <p className="text-muted-foreground">
          Deep-dive reports and data visualizations on all aspects of the
          operational workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Schedule Reports</CardTitle>
            <CardDescription>
              Generate reports on active schedules, completion rates, and
              delays.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
              <BarChart2 className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Generate detailed schedule adherence and performance reports.
              </p>
              <Button>
                <Download className="mr-2" />
                Generate Schedule Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
            <CardDescription>
              Visualize the capacity usage of key machines and teams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={resourceData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                <XAxis type="number" hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="utilization" fill="var(--color-utilization)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Efficiency Analysis</CardTitle>
          <CardDescription>
            Compare planned vs. actual output and identify performance trends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <LineChart data={efficiencyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="planned" stroke="var(--color-planned)" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
