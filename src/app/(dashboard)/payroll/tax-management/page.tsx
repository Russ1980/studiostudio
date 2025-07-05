
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield } from "lucide-react";


const taxFilings = [
    { form: "Federal Form 941", jurisdiction: "Federal", dueDate: "2024-07-31", status: "Upcoming" },
    { form: "CA DE 9/9C", jurisdiction: "California", dueDate: "2024-07-31", status: "Upcoming" },
    { form: "Federal Form 940", jurisdiction: "Federal", dueDate: "2025-01-31", status: "Upcoming" },
];

const taxPayments = [
    { type: "Federal Income Tax", amount: "$85,342.10", dueDate: "2024-07-15", status: "Scheduled" },
    { type: "Social Security & Medicare", amount: "$31,745.50", dueDate: "2024-07-15", status: "Scheduled" },
    { type: "CA PIT/SDI", amount: "$22,810.90", dueDate: "2024-07-15", status: "Scheduled" },
    { type: "Federal Unemployment (FUTA)", amount: "$1,240.00", dueDate: "2024-07-31", status: "Upcoming" },
];

const statusVariant: { [key: string]: "success" | "default" | "secondary" } = {
  Paid: "success",
  Scheduled: "default",
  Upcoming: "secondary",
};


export default function TaxManagementPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tax Management</h1>
          <p className="text-muted-foreground">
            Manage payroll tax filings and payments.
          </p>
        </div>
        <Button variant="outline"><Shield className="mr-2"/> View Tax Setup</Button>
      </div>

      <Tabs defaultValue="filings" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="filings">Tax Filings</TabsTrigger>
          <TabsTrigger value="payments">Tax Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="filings" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Tax Filings</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Form</TableHead>
                                <TableHead>Jurisdiction</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {taxFilings.map((filing, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{filing.form}</TableCell>
                                    <TableCell>{filing.jurisdiction}</TableCell>
                                    <TableCell>{filing.dueDate}</TableCell>
                                    <TableCell><Badge variant={statusVariant[filing.status]}>{filing.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Scheduled Tax Payments</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Payment Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {taxPayments.map((payment, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{payment.type}</TableCell>
                                    <TableCell>${payment.amount}</TableCell>
                                    <TableCell>{payment.dueDate}</TableCell>
                                    <TableCell><Badge variant={statusVariant[payment.status]}>{payment.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
