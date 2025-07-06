
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPaymentsToProcess } from "@/lib/actions";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProcessPaymentsPage() {
    const [payments, setPayments] = useState<any[]>([]);

    useEffect(() => {
        getPaymentsToProcess().then(setPayments);
    }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Process Payments</h1>
        <p className="text-muted-foreground">
          Review and process pending payments received via ACH or credit card.
        </p>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Pending Payments</CardTitle>
                    <CardDescription>
                        A list of incoming payments to be reviewed and approved.
                    </CardDescription>
                </div>
                <Button>Process Selected (0)</Button>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Checkbox/></TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell><Checkbox/></TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell className="font-medium">{payment.customer}</TableCell>
                            <TableCell>${payment.amount.toFixed(2)}</TableCell>
                            <TableCell><Badge variant="secondary">{payment.method}</Badge></TableCell>
                            <TableCell>{payment.reference}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                    <Button variant="outline" size="sm">View Details</Button>
                                    <Button size="sm" variant="success">Approve</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        <CardFooter>
            <p className="text-sm text-muted-foreground">Showing {payments.length} pending payments.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
