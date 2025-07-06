"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { DollarSign, BarChart2 } from "lucide-react";

const chartConfig = {
    value: { label: 'Expenses' },
    salaries: { label: 'Salaries' },
    cogs: { label: 'COGS' },
    marketing: { label: 'Marketing' },
    rd: { label: 'R&D' },
    overhead: { label: 'Overhead' },
    other: { label: 'Other' },
}

export function ExpenseAnalyticsClient({ data }: { data: any }) {

  return (
    <>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.kpiData.map((kpi: any, index: number) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Expense Breakdown by Category</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="name" hideLabel />}
                        />
                        <Pie data={data.expenseByCategory} dataKey="value" nameKey="name" innerRadius={60}>
                            {data.expenseByCategory.map((entry: any) => (
                                <Cell key={entry.name} fill={entry.fill} />
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
    </>
  );
}
