
import { getJobCostingDashboardData } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { DollarSign, Briefcase, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const chartConfig = {
  budget: { label: "Budget", color: "hsl(var(--chart-2))" },
  actual: { label: "Actual", color: "hsl(var(--primary))" },
};

export default async function JobCostingDashboardPage() {
  const data = await getJobCostingDashboardData();
  const { kpiData, budgetVsActualData, recentCostEntries } = data;

  return (
    <div className="grid gap-6">
       <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Job Costing Dashboard</h1>
                <p className="text-muted-foreground">
                    An overview of job performance, profitability, and cost tracking.
                </p>
            </div>
            <Button asChild>
                <Link href="/operations/job-costing/jobs/new"><PlusCircle className="mr-2"/> New Job</Link>
            </Button>
        </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle>Budget vs. Actual</CardTitle>
            <CardDescription>Compare budgeted vs. actual costs for active jobs.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-80 w-full">
                <BarChart data={budgetVsActualData} layout="vertical" margin={{ left: 20 }}>
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
            <CardTitle>Recent Cost Entries</CardTitle>
            <CardDescription>Latest costs allocated to jobs.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentCostEntries.map((entry: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{entry.job}</TableCell>
                            <TableCell>{entry.type}</TableCell>
                            <TableCell className="text-right">${entry.amount}</TableCell>
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
