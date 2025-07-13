
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const chartConfig = {
  value: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
};

export function SearchClientPage({ stockData }: { stockData: any }) {
  const router = useRouter();
  const [ticker, setTicker] = useState(stockData.ticker);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?ticker=${ticker.toUpperCase()}`);
  };
  
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
          <form onSubmit={handleSearch} className="flex w-full max-w-lg items-center space-x-2">
            <Input 
              type="text" 
              placeholder="Search by ticker (e.g., AAPL)" 
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
            <Button type="submit">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
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
                <p className={`text-lg font-semibold ${stockData.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {stockData.change > 0 ? '+' : ''}{stockData.change} ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent}%)
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart data={stockData.chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
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
