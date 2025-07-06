
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

export default function BalanceSheetPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Balance Sheet</h1>
            <p className="text-muted-foreground">As of June 30, 2024</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><CalendarIcon />Date</Button>
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
                    {/* Assets */}
                    <TableRow className="font-bold">
                        <TableCell>Assets</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="pl-8">Current Assets</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="pl-16">Main Checking Account</TableCell>
                        <TableCell className="text-right">$1,250,320.50</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-16">Accounts Receivable</TableCell>
                        <TableCell className="text-right">$245,800.00</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell className="pl-8">Total Current Assets</TableCell>
                        <TableCell className="text-right">$1,496,120.50</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Fixed Assets</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-16">Machinery & Equipment</TableCell>
                        <TableCell className="text-right">$74,250.00</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-y-2 border-foreground bg-muted/50">
                        <TableCell>Total Assets</TableCell>
                        <TableCell className="text-right">$1,570,370.50</TableCell>
                    </TableRow>

                    {/* Liabilities & Equity */}
                    <TableRow className="font-bold pt-4">
                        <TableCell>Liabilities & Equity</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Liabilities</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-16">Accounts Payable</TableCell>
                        <TableCell className="text-right">$88,450.00</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell className="pl-8">Total Liabilities</TableCell>
                        <TableCell className="text-right">$88,450.00</TableCell>
                    </TableRow>

                     <TableRow>
                        <TableCell className="pl-8">Equity</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="pl-16">Owner's Equity</TableCell>
                        <TableCell className="text-right">$1,051,820.50</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-16">Retained Earnings</TableCell>
                        <TableCell className="text-right">$430,100.00</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell className="pl-8">Total Equity</TableCell>
                        <TableCell className="text-right">$1,481,920.50</TableCell>
                    </TableRow>

                     <TableRow className="font-bold border-y-2 border-foreground bg-muted/50">
                        <TableCell>Total Liabilities & Equity</TableCell>
                        <TableCell className="text-right">$1,570,370.50</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
