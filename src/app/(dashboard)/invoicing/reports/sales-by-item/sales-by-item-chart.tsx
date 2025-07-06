"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

const chartConfig = {
  sales: {
    label: "Sales",
  },
};

type SalesItem = {
    item: string;
    quantity: number;
    sales: number;
    category: string;
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export function SalesByItemChart({ data }: { data: SalesItem[] }) {
    const chartData = data.map(item => ({ name: item.item, value: item.sales }));
    
  return (
    <Card>
        <CardHeader>
            <CardTitle>Sales Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <ChartLegend
                      content={<ChartLegendContent nameKey="name" />}
                      className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                    />
                </PieChart>
            </ChartContainer>
        </CardContent>
    </Card>
  );
}
