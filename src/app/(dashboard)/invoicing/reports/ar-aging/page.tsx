
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter as TFoot
} from "@/components/ui/table";
import { CalendarIcon, Download, Printer } from "lucide-react";

const agingData = [
  { customer: "Innovate Inc.", current: "5,000.00", "1-30": "2,500.00", "31-60": "0.00", "61-90": "0.00", "90+": "0.00", total: "7,500.00" },
  { customer: "Apex Solutions", current: "10,000.00", "1-30": "0.00", "31-60": "5,000.00", "61-90": "0.00", "90+": "0.00", total: "15,000.00" },
  { customer: "QuantumLeap Co.", current: "0.00", "1-30": "0.00", "31-60": "1,200.00", "61-90": "800.00", "90+": "0.00", total: "2,000.00" },
  { customer: "Stellar Goods", current: "0.00", "1-30": "0.00", "31-60": "0.00", "61-90": "0.00", "90+": "1,500.00", total: "1,500.00" },
];

export default function ARAgingPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">A/R Aging Summary</h1>
            <p className="text-muted-foreground">As of July 22, 2024</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><CalendarIcon /> As of Date</Button>
            <Button variant="outline"><Printer /> Print</Button>
            <Button><Download /> Export</Button>
          </div>
       </div>
       <Card>
            <CardContent className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="text-right">Current</TableHead>
                            <TableHead className="text-right">1 - 30 Days</TableHead>
                            <TableHead className="text-right">31 - 60 Days</TableHead>
                            <TableHead className="text-right">61 - 90 Days</TableHead>
                            <TableHead className="text-right">> 90 Days</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agingData.map((row) => (
                            <TableRow key={row.customer}>
                                <TableCell className="font-medium">{row.customer}</TableCell>
                                <TableCell className="text-right">${row.current}</TableCell>
                                <TableCell className="text-right">${row["1-30"]}</TableCell>
                                <TableCell className="text-right">${row["31-60"]}</TableCell>
                                <TableCell className="text-right">${row["61-90"]}</TableCell>
                                <TableCell className="text-right">${row["90+"]}</TableCell>
                                <TableCell className="text-right font-bold">${row.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TFoot>
                        <TableRow className="font-bold bg-muted/50 text-lg">
                            <TableCell>Total</TableCell>
                            <TableCell className="text-right">$15,000.00</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                            <TableCell className="text-right">$6,200.00</TableCell>
                            <TableCell className="text-right">$800.00</TableCell>
                            <TableCell className="text-right">$1,500.00</TableCell>
                            <TableCell className="text-right">$26,000.00</TableCell>
                        </TableRow>
                    </TFoot>
                </Table>
            </CardContent>
       </Card>
    </div>
  );
}
