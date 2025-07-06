
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

type Job = {
  id: string;
  name: string;
  customer: string;
  status: string;
  budget: number;
  spent: number;
  profitability: number;
};

const chartConfig = {
  budget: { label: "Budget", color: "hsl(var(--chart-2))" },
  actual: { label: "Actual", color: "hsl(var(--primary))" },
};

export function BudgetVsActualClient({ jobs }: { jobs: Job[] }) {
  const chartData = jobs.map(job => ({
      name: job.name,
      budget: job.budget,
      actual: job.spent,
  }));

  return (
    <Card>
      <CardHeader>
          <CardTitle>Visual Comparison</CardTitle>
          <CardDescription>Visualize spending against budget for each job.</CardDescription>
      </CardHeader>
      <CardContent>
          <ChartContainer config={chartConfig} className="h-80 w-full">
              <BarChart data={chartData} layout="vertical" margin={{ left: 0, top: 5, right: 20, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tickLine={false} 
                    axisLine={true} 
                    tickMargin={10} 
                    width={140}
                    interval={0}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="budget" fill="var(--color-budget)" radius={[0, 4, 4, 0]} name="Budget" />
                  <Bar dataKey="actual" fill="var(--color-actual)" radius={[0, 4, 4, 0]} name="Actual" />
              </BarChart>
          </ChartContainer>
      </CardContent>
    </Card>
  );
}
