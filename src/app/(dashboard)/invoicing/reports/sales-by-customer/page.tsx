
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { CalendarIcon, Download, Printer } from "lucide-react";
import { getSalesByCustomerData } from '@/lib/actions';

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
};

export default async function SalesByCustomerPage() {
  const salesData = await getSalesByCustomerData();
  const chartSalesData = salesData.map(d => ({ ...d, sales: parseFloat(d.sales) }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales by Customer Summary</h1>
          <p className="text-muted-foreground">For period: Jan 1, 2024 - {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><CalendarIcon /> Date Range</Button>
            <Button variant="outline"><Printer /> Print</Button>
            <Button><Download /> Export</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Customers by Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <BarChart
                data={chartSalesData}
                layout="vertical"
                margin={{ left: 10, right: 10 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="customer" type="category" tickLine={false} axisLine={false} width={100} />
                <XAxis dataKey="sales" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Sales Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right"># of Invoices</TableHead>
                  <TableHead className="text-right">Total Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((row) => (
                  <TableRow key={row.customer}>
                    <TableCell className="font-medium">{row.customer}</TableCell>
                    <TableCell className="text-right">{row.invoices}</TableCell>
                    <TableCell className="text-right font-bold">${parseFloat(row.sales).toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
