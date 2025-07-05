
"use client";

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
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";

const trendingStocks = [
  { name: "Apple Inc.", ticker: "AAPL", price: "172.25", change: "+1.5%", changeType: "up" },
  { name: "Tesla, Inc.", ticker: "TSLA", price: "185.79", change: "-0.8%", changeType: "down" },
  { name: "NVIDIA Corp", ticker: "NVDA", price: "950.02", change: "+3.2%", changeType: "up" },
  { name: "Amazon.com", ticker: "AMZN", price: "180.38", change: "+0.5%", changeType: "up" },
  { name: "Meta Platforms", ticker: "META", price: "527.34", change: "-1.2%", changeType: "down" },
];

const marketNews = [
    { id: 1, title: "Fed holds interest rates steady, signals cuts are coming", source: "Reuters", time: "2h ago", image: "https://placehold.co/400x200.png", hint: "finance meeting" },
    { id: 2, title: "Tech stocks rally on strong earnings reports", source: "Bloomberg", time: "5h ago", image: "https://placehold.co/400x200.png", hint: "stock chart" },
    { id: 3, title: "Oil prices surge amid geopolitical tensions", source: "Wall Street Journal", time: "8h ago", image: "https://placehold.co/400x200.png", hint: "oil pump" },
];

const chartData = [
  { month: "Jan", value: 4500 },
  { month: "Feb", value: 4600 },
  { month: "Mar", value: 4750 },
  { month: "Apr", value: 4700 },
  { month: "May", value: 4850 },
  { month: "Jun", value: 5100 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
};

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>S&P 500</CardTitle>
            <CardDescription>Last 6 Months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area type="monotone" dataKey="value" stroke="var(--color-value)" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NASDAQ Composite</CardTitle>
            <CardDescription>Last 6 Months</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-48 w-full">
              <AreaChart data={chartData.map(d => ({...d, value: d.value * 1.5}))}>
                 <defs>
                  <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorValue2)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Trending Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">24h Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trendingStocks.map((stock) => (
                  <TableRow key={stock.ticker}>
                    <TableCell>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-sm text-muted-foreground">{stock.ticker}</div>
                    </TableCell>
                    <TableCell>${stock.price}</TableCell>
                    <TableCell className="text-right">
                       <Badge variant={stock.changeType === 'up' ? 'default' : 'destructive'} className={stock.changeType === 'up' ? 'bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:bg-red-500/20 dark:text-red-400'}>
                        {stock.changeType === 'up' ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                        {stock.change}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketNews.map((news) => (
                <div key={news.id} className="flex items-start gap-4">
                  <Image
                    src={news.image}
                    alt={news.title}
                    width={80}
                    height={80}
                    className="aspect-square rounded-md object-cover"
                    data-ai-hint={news.hint}
                  />
                  <div className="space-y-1">
                    <p className="font-medium leading-tight">{news.title}</p>
                    <div className="text-sm text-muted-foreground">
                      {news.source} &middot; {news.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
