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
    TableRow,
  } from "@/components/ui/table";
import { Download, Printer, Calendar as CalendarIcon } from "lucide-react";
import { getSalesByItemData } from "@/lib/actions";
import { SalesByItemChart } from "./sales-by-item-chart";

type SalesItem = {
    item: string;
    quantity: number;
    sales: number;
    category: string;
}

export default async function SalesByItemPage() {
    const salesData: SalesItem[] = await getSalesByItemData();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Sales by Item/Service</h1>
                    <p className="text-muted-foreground">
                        Provides a breakdown of sales by each product or service you offer.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><CalendarIcon className="mr-2"/>Date Range</Button>
                    <Button variant="outline"><Printer /> Print</Button>
                    <Button><Download /> Export</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Sales Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item/Service</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Quantity Sold</TableHead>
                                        <TableHead className="text-right">Total Sales</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {salesData.map((row) => (
                                        <TableRow key={row.item}>
                                            <TableCell className="font-medium">{row.item}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell className="text-right">{row.quantity}</TableCell>
                                            <TableCell className="text-right font-bold">${row.sales.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <SalesByItemChart data={salesData} />
                </div>
            </div>
        </div>
    )
}
