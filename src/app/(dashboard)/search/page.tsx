
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import Image from "next/image";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";

const stockData = {
  name: "Apple Inc.",
  ticker: "AAPL",
  price: "172.25",
  change: "+2.50",
  changePercent: "+1.5",
  logo: "https://placehold.co/40x40.png",
  marketCap: "2.65T",
  peRatio: "28.5",
  divYield: "0.55%",
  about: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.",
};

const chartData = [
  { date: "9:30", value: 170.50 },
  { date: "10:00", value: 171.00 },
  { date: "11:00", value: 171.75 },
  { date: "12:00", value: 171.25 },
  { date: "1:00", value: 172.00 },
  { date: "2:00", value: 172.50 },
  { date: "3:00", value: 172.10 },
  { date: "4:00", value: 172.25 },
];

const chartConfig = {
  value: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
};

export default function SearchPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Stock Search</CardTitle>
          <CardDescription>
            Find real-time price, charts, and key financial data for any stock.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-lg items-center space-x-2">
            <Input type="text" placeholder="Search by ticker (e.g., AAPL)" />
            <Button type="submit">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Image
              src={stockData.logo}
              alt={`${stockData.name} logo`}
              width={40}
              height={40}
              className="rounded-full"
              data-ai-hint="company logo"
            />
            <div>
              <CardTitle>{stockData.name} ({stockData.ticker})</CardTitle>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">${stockData.price}</p>
                <p className="text-lg font-semibold text-green-500">
                  {stockData.change} ({stockData.changePercent}%)
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
              <ChartTooltip cursor content={<ChartTooltipContent indicator="dot" />} />
              <Area dataKey="value" type="natural" fill="url(#fill)" stroke="var(--color-value)" />
            </AreaChart>
          </ChartContainer>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Market Cap</CardDescription>
                <CardTitle className="text-xl">{stockData.marketCap}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>P/E Ratio</CardDescription>
                <CardTitle className="text-xl">{stockData.peRatio}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Dividend Yield</CardDescription>
                <CardTitle className="text-xl">{stockData.divYield}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold">About {stockData.name}</h3>
            <p className="text-muted-foreground">{stockData.about}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
