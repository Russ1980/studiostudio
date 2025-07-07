
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
  Users,
  DollarSign,
  Shield,
  FileText,
  Clock,
  ShieldAlert,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  gross: {
    label: "Gross Pay",
    color: "hsl(var(--primary))",
  },
  net: {
    label: "Net Pay",
    color: "hsl(var(--secondary-foreground))",
  },
};

const priorityVariant: { [key: string]: "destructive" | "default" | "secondary" } = {
  High: "destructive",
  Medium: "default",
  Low: "secondary",
};

const iconMap: { [key: string]: React.ElementType } = {
    DollarSign,
    Shield,
    Users
};


export function PayrollDashboardClientPage({ initialData }: { initialData: any }) {
    const { kpiData, chartData, upcomingDeadlines, currentPayRun } = initialData;

    return (
        <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Payroll Dashboard</h1>
                <p className="text-muted-foreground">
                    A command center for all payroll-related activities, key metrics, and urgent tasks.
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">Off-Cycle Payroll</Button>
                <Button>Run Payroll</Button>
            </div>
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
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    </CardContent>
                </Card>
            )})}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Payroll Trends</CardTitle>
                <CardDescription>Gross vs. Net pay over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-72 w-full">
                <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    top: 20,
                    right: 20,
                    bottom: 5,
                    left: 0,
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
                    content={<ChartTooltipContent />}
                    />
                    <Line
                    dataKey="gross"
                    type="monotone"
                    stroke="var(--color-gross)"
                    strokeWidth={2}
                    dot={false}
                    />
                    <Line
                    dataKey="net"
                    type="monotone"
                    stroke="var(--color-net)"
                    strokeWidth={2}
                    dot={false}
                    />
                </LineChart>
                </ChartContainer>
            </CardContent>
            </Card>

            <div className="flex flex-col gap-6">
                <Card>
                <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {upcomingDeadlines.map((deadline: any, index: number) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                <Clock className="h-5 w-5 text-secondary-foreground" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{deadline.title}</p>
                                <p className="text-sm text-muted-foreground">{deadline.deadline}</p>
                            </div>
                            <Badge variant={priorityVariant[deadline.priority as keyof typeof priorityVariant]} className="h-fit">{deadline.priority}</Badge>
                        </div>
                    ))}
                </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Current Pay Run</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Progress value={currentPayRun.progress} />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Next Step: {currentPayRun.nextStep}</span>
                            <span>{currentPayRun.employees} Employees</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Continue Pay Run</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Compliance Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-4">
                            <ShieldAlert className="h-5 w-5 text-destructive mt-1" />
                            <div>
                                <p className="font-medium">New Minimum Wage</p>
                                <p className="text-sm text-muted-foreground">California minimum wage increases to $16.00/hr on July 1st.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <Button variant="outline"><FileText className="mr-2"/> Payroll Register</Button>
                        <Button variant="outline"><FileText className="mr-2"/> Tax Liability Summary</Button>
                        <Button variant="outline"><FileText className="mr-2"/> Employee Summary</Button>
                        <Button variant="outline"><FileText className="mr-2"/> Benefits Summary</Button>
                    </CardContent>
                </Card>
        </div>
        </div>
    )
}
