
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
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
import { CalendarIcon, Printer, Download } from "lucide-react";


export default function ProfitAndLossPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profit & Loss Statement</h1>
            <p className="text-muted-foreground">For the period: Jan 1, 2024 - Jun 30, 2024</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><CalendarIcon />Date Range</Button>
            <Button variant="outline"><Printer />Print</Button>
            <Button><Download />Export</Button>
          </div>
       </div>

       <Card>
        <CardContent className="p-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="font-bold">
                        <TableCell>Revenue</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Sales Revenue</TableCell>
                        <TableCell className="text-right">$1,200,500.00</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell>Total Revenue</TableCell>
                        <TableCell className="text-right">$1,200,500.00</TableCell>
                    </TableRow>

                    <TableRow className="font-bold pt-4">
                        <TableCell>Cost of Goods Sold</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Cost of Sales</TableCell>
                        <TableCell className="text-right">$450,000.00</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell>Total COGS</TableCell>
                        <TableCell className="text-right">$450,000.00</TableCell>
                    </TableRow>

                     <TableRow className="font-bold border-y-2 border-foreground">
                        <TableCell>Gross Profit</TableCell>
                        <TableCell className="text-right">$750,500.00</TableCell>
                    </TableRow>

                     <TableRow className="font-bold pt-4">
                        <TableCell>Operating Expenses</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Salaries and Wages</TableCell>
                        <TableCell className="text-right">$250,000.00</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Rent Expense</TableCell>
                        <TableCell className="text-right">$60,000.00</TableCell>
                    </TableRow>
                      <TableRow>
                        <TableCell className="pl-8">Utilities</TableCell>
                        <TableCell className="text-right">$10,400.00</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell>Total Operating Expenses</TableCell>
                        <TableCell className="text-right">$320,400.00</TableCell>
                    </TableRow>

                     <TableRow className="font-bold border-y-2 border-foreground bg-muted/50">
                        <TableCell>Net Income</TableCell>
                        <TableCell className="text-right">$430,100.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
