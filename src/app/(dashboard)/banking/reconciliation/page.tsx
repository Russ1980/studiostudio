
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const payments = [
    { date: "2024-06-25", description: "Cloud Services LLC", amount: "5,000.00" },
    { date: "2024-06-20", description: "Marketing Agency Co.", amount: "10,500.00" },
    { date: "2024-06-18", description: "Office Supplies Inc.", amount: "1,200.00" },
];

const deposits = [
    { date: "2024-06-28", description: "Payment from Innovate Inc.", amount: "50,000.00" },
    { date: "2024-06-22", description: "Stripe Payout", amount: "12,500.00" },
];


export default function ReconciliationPage() {
  const [difference, setDifference] = useState(500.00);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Bank Reconciliation</h1>
        <p className="text-muted-foreground">
          Compare your records against your bank statement to ensure they match.
        </p>
      </div>

      <Card>
        <CardHeader className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
             <div className="grid gap-2">
                <Label>Account</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select an account"/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="checking">Business Checking</SelectItem>
                        <SelectItem value="savings">Savings Account</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="statement-balance">Statement Ending Balance</Label>
                <Input id="statement-balance" type="number" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="statement-date">Statement Ending Date</Label>
                <Input id="statement-date" type="date" />
            </div>
            <Button>Start Reconciling</Button>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center border rounded-lg p-4 mb-6">
                <div>
                    <p className="text-sm text-muted-foreground">Cleared Balance</p>
                    <p className="text-xl font-semibold">$1,301,520.50</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Statement Balance</p>
                    <p className="text-xl font-semibold">$1,302,020.50</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Difference</p>
                    <p className={`text-xl font-semibold ${difference === 0 ? 'text-success' : 'text-destructive'}`}>
                        ${difference.toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Payments and Debits</h3>
                    <Table>
                        <TableHeader><TableRow><TableHead><Checkbox/></TableHead><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead>Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {payments.map((p, i) => (
                                <TableRow key={i}><TableCell><Checkbox/></TableCell><TableCell>{p.date}</TableCell><TableCell>{p.description}</TableCell><TableCell>${p.amount}</TableCell></TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold mb-2">Deposits and Credits</h3>
                     <Table>
                        <TableHeader><TableRow><TableHead><Checkbox/></TableHead><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead>Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {deposits.map((d, i) => (
                                <TableRow key={i}><TableCell><Checkbox/></TableCell><TableCell>{d.date}</TableCell><TableCell>{d.description}</TableCell><TableCell>${d.amount}</TableCell></TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </CardContent>
         <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Button variant="outline">Save for Later</Button>
          <Button disabled={difference !== 0}>Finish Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
