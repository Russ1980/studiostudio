
"use client";

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
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Users } from "lucide-react";
import Link from "next/link";

const kpis = [
  { title: "Total Outstanding", value: "$245,800.00" },
  { title: "Current (1-30 Days)", value: "$210,600.00" },
  { title: "Overdue (31-60 Days)", value: "$25,200.00" },
  { title: "Overdue (60+ Days)", value: "$10,000.00" },
];

const overdueInvoices = [
  { invoice: "#INV-2024-045", customer: "Stellar Goods", dueDate: "2024-05-30", amount: "10,000.00", status: "60+ Days Overdue" },
  { invoice: "#INV-2024-048", customer: "QuantumLeap Co.", dueDate: "2024-06-15", amount: "15,200.00", status: "45 Days Overdue" },
  { invoice: "#INV-2024-049", customer: "Momentum LLC", dueDate: "2024-06-20", amount: "10,000.00", status: "40 Days Overdue" },
];

export default function ARDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts Receivable</h1>
          <p className="text-muted-foreground">
            Manage all money owed to your company.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/accounting/accounts-receivable/customers"><Users />Manage Customers</Link>
          </Button>
          <Button><PlusCircle />Create Invoice</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overdue Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overdueInvoices.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{invoice.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
