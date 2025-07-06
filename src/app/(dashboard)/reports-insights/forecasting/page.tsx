
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { Zap } from "lucide-react";

const forecastData = [
  { month: "Jan", actual: 680 },
  { month: "Feb", actual: 720 },
  { month: "Mar", actual: 810 },
  { month: "Apr", actual: 790 },
  { month: "May", actual: 850 },
  { month: "Jun", actual: 920, forecast: 920 },
  { month: "Jul", forecast: 950 },
  { month: "Aug", forecast: 980 },
  { month: "Sep", forecast: 1020 },
  { month: "Oct", forecast: 1100 },
  { month: "Nov", forecast: 1150 },
  { month: "Dec", forecast: 1200 },
];

const chartConfig = {
  actual: { label: "Actual", color: "hsl(var(--chart-2))" },
  forecast: { label: "Forecast", color: "hsl(var(--primary))" },
};

export default function ForecastingPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Scenario Planner</CardTitle>
            <CardDescription>
              Run "what-if" scenarios to project future business performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Forecast Type</Label>
              <Input defaultValue="Revenue" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="growth-rate">Revenue Growth Rate (%)</Label>
              <Input id="growth-rate" type="number" defaultValue="5" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cogs">Change in COGS (%)</Label>
              <Input id="cogs" type="number" defaultValue="2" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hires">New Hires</Label>
              <Input id="hires" type="number" defaultValue="2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full"><Zap/> Run Forecast</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Projection</CardTitle>
            <CardDescription>Based on a 5% monthly growth rate.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-80 w-full">
              <LineChart data={forecastData} margin={{ left: -10, right: 10 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis tickFormatter={(value) => `$${value}k`} tickLine={false} axisLine={false} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="forecast" stroke="var(--color-forecast)" strokeWidth={2} strokeDasharray="5 5" dot={false}/>
              </LineChart>
            </ChartContainer>
            <div className="p-4 mt-4 rounded-lg bg-muted/50 text-center">
                <p className="font-semibold">Projected Outcome</p>
                <p className="text-muted-foreground text-sm">Projected annual revenue is $10.9M, a 12% increase from the current run-rate.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
