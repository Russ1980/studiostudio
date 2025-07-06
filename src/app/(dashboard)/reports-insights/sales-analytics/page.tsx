
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
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { getSalesAnalyticsData } from "@/lib/actions";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const chartConfig = {
    sales: { label: "Sales", color: "hsl(var(--primary))" },
};

export default function SalesAnalyticsPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getSalesAnalyticsData().then(setData);
    }, []);

    if (!data) {
        return <div>Loading...</div>; // Or a skeleton loader
    }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Sales Analytics</h1>
        <p className="text-muted-foreground">
          Provide detailed analytics specifically on sales performance.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.kpiData.map((kpi: any) => (
                <Card key={kpi.title}>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                            {kpi.change} vs last period
                        </p>
                    </CardContent>
                </Card>
            ))}
       </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Sales Over Time</CardTitle>
                    <CardDescription>Monthly sales performance YTD.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-72 w-full">
                        <LineChart data={data.salesOverTime} margin={{ left: 0, right: 20 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                            <YAxis tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Sales leaders by total sales YTD.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {data.topPerformers.map((performer: any) => (
                            <li key={performer.name} className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarFallback>{performer.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-medium">{performer.name}</p>
                                </div>
                                <p className="font-semibold">${performer.sales.toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
