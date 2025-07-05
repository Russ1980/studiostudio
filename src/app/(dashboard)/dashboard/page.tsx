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
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";

const keyMetrics = [
  { name: 'S&P 500', value: '4,512.76', change: '+0.82%', changeType: 'up' },
  { name: 'Dow Jones', value: '35,459.21', change: '+0.56%', changeType: 'up' },
  { name: 'NASDAQ', value: '14,034.12', change: '+1.14%', changeType: 'up' },
  { name: 'Russell 2000', value: '1,987.45', change: '-0.23%', changeType: 'down' },
];

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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              {metric.changeType === 'up' ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.changeType === 'up' ? 'text-success' : 'text-destructive'}`}>
                {metric.change} today
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Market Performance</CardTitle>
            <CardDescription>Last 6 Months Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-72 w-full">
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
                       <Badge variant={stock.changeType === 'up' ? 'success' : 'destructive'}>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market News</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </CardContent>
      </Card>
    </div>
  );
}
