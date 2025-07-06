
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


export default function CashFlowStatementPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Statement of Cash Flows</h1>
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
                        <TableCell>Cash flow from operating activities</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Net Income</TableCell>
                        <TableCell className="text-right">$430,100.00</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Depreciation</TableCell>
                        <TableCell className="text-right">$9,000.00</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Changes in Accounts Receivable</TableCell>
                        <TableCell className="text-right">($50,000.00)</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell>Net cash provided by operating activities</TableCell>
                        <TableCell className="text-right">$389,100.00</TableCell>
                    </TableRow>

                    <TableRow className="font-bold pt-4">
                        <TableCell>Cash flow from investing activities</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Purchase of equipment</TableCell>
                        <TableCell className="text-right">($25,000.00)</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell>Net cash used in investing activities</TableCell>
                        <TableCell className="text-right">($25,000.00)</TableCell>
                    </TableRow>
                    
                    <TableRow className="font-bold pt-4">
                        <TableCell>Cash flow from financing activities</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8">Owner's draw</TableCell>
                        <TableCell className="text-right">($10,000.00)</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell>Net cash used in financing activities</TableCell>
                        <TableCell className="text-right">($10,000.00)</TableCell>
                    </TableRow>

                     <TableRow className="font-bold border-t pt-4">
                        <TableCell>Net increase in cash</TableCell>
                        <TableCell className="text-right">$354,100.00</TableCell>
                    </TableRow>

                     <TableRow className="font-bold border-y-2 border-foreground bg-muted/50">
                        <TableCell>Cash at end of period</TableCell>
                        <TableCell className="text-right">$1,250,320.50</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
