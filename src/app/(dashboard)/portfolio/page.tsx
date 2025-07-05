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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ArrowUp, TrendingUp } from "lucide-react";

const portfolioData = {
  totalValue: 125384.52,
  change24h: 1230.12,
  change24hPercent: 0.99,
  totalGainLoss: 25384.52,
  totalGainLossPercent: 25.38,
};

const holdings = [
  { name: "Apple Inc.", ticker: "AAPL", quantity: 50, price: 172.25, changePercent: 1.5, value: 8612.50 },
  { name: "Bitcoin", ticker: "BTC", quantity: 0.5, price: 65000.00, changePercent: 2.1, value: 32500.00 },
  { name: "NVIDIA Corp", ticker: "NVDA", quantity: 25, price: 950.02, changePercent: 3.2, value: 23750.50 },
  { name: "Ethereum", ticker: "ETH", quantity: 10, price: 3500.00, changePercent: -0.5, value: 35000.00 },
  { name: "Amazon.com", ticker: "AMZN", quantity: 15, price: 180.38, changePercent: 0.5, value: 2705.70 },
];

const chartData = [
  { date: "2023-01", value: 100000 },
  { date: "2023-02", value: 105000 },
  { date: "2023-03", value: 110000 },
  { date: "2023-04", value: 108000 },
  { date: "2023-05", value: 115000 },
  { date: "2023-06", value: 125384 },
];

const chartConfig = {
  value: {
    label: "Portfolio Value",
    color: "hsl(var(--primary))",
  },
};

export default function PortfolioPage() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Change</CardTitle>
            <ArrowUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+${portfolioData.change24h.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">(+{portfolioData.change24hPercent}%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+${portfolioData.totalGainLoss.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">(+{portfolioData.totalGainLossPercent}%)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Your portfolio value over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart data={chartData} margin={{ left: -20, right: 20 }}>
              <defs>
                <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="value"
                type="natural"
                fill="url(#fillGradient)"
                stroke="var(--color-value)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((asset) => (
                <TableRow key={asset.ticker}>
                  <TableCell>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                  </TableCell>
                  <TableCell>{asset.quantity.toLocaleString()}</TableCell>
                  <TableCell>${asset.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={asset.changePercent >= 0 ? 'text-success' : 'text-destructive'}>
                      {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">${asset.value.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
