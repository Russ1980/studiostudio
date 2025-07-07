
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

const chartConfig = {
  profit: {
    label: "Profit",
    color: "hsl(var(--primary))",
  },
};

export function ProfitabilityClientPage({ profitabilityData }: { profitabilityData: any[] }) {
    
  const chartData = profitabilityData.map(job => ({
    name: job.jobName,
    profit: job.revenue - job.costs,
  }));

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Profitability Report</h1>
            <p className="text-muted-foreground">Analyze profit and loss across all jobs.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Printer /> Print</Button>
            <Button><Download /> Export</Button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Profitability by Job</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Job Name</TableHead>
                                    <TableHead>Revenue</TableHead>
                                    <TableHead>Costs</TableHead>
                                    <TableHead>Gross Profit</TableHead>
                                    <TableHead>Margin</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {profitabilityData.map((job) => {
                                    const profit = job.revenue - job.costs;
                                    const margin = job.revenue > 0 ? ((profit / job.revenue) * 100).toFixed(1) : "0.0";
                                    return (
                                        <TableRow key={job.jobName}>
                                            <TableCell className="font-medium">{job.jobName}</TableCell>
                                            <TableCell>${job.revenue.toLocaleString()}</TableCell>
                                            <TableCell>${job.costs.toLocaleString()}</TableCell>
                                            <TableCell className={profit >= 0 ? 'text-success' : 'text-destructive'}>${profit.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={profit >= 0 ? 'success' : 'destructive'}>{margin}%</Badge>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                 </Card>
            </div>
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Profit Comparison</CardTitle>
                        <CardDescription>Visualize which jobs are the most profitable.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-80 w-full">
                            <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid horizontal={false} />
                                <XAxis type="number" dataKey="profit" tickFormatter={(value) => `$${Number(value)/1000}k`} />
                                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={10} width={120} />
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                 </Card>
            </div>
       </div>
    </div>
  );
}
