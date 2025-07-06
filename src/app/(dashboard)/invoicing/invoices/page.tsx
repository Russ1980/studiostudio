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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const invoices = [
  { invoice: "#INV-2024-051", customer: "QuantumLeap Co.", amount: "25,000.00", dueDate: "2024-07-31", status: "Sent" },
  { invoice: "#INV-2024-050", customer: "Apex Solutions", amount: "12,500.00", dueDate: "2024-06-20", status: "Paid" },
  { invoice: "#INV-2024-049", customer: "Momentum LLC", amount: "10,000.00", dueDate: "2024-06-20", status: "Overdue" },
  { invoice: "#INV-2024-048", customer: "Stellar Goods", amount: "5,000.00", dueDate: "2024-07-15", status: "Sent" },
  { invoice: "#INV-2024-047", customer: "Innovate Inc.", amount: "50,000.00", dueDate: "2024-06-15", status: "Paid" },
];

const statusVariant: { [key: string]: "success" | "destructive" | "default" } = {
  Paid: "success",
  Overdue: "destructive",
  Sent: "default",
};

export default function InvoiceManagementPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoice Management</h1>
          <p className="text-muted-foreground">
            A central place for managing the entire lifecycle of an invoice.
          </p>
        </div>
        <Button asChild>
          <Link href="/invoicing/new"><PlusCircle className="mr-2"/> Create Invoice</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Invoices</CardTitle>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by customer..." className="pl-9" />
                </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-mono">{invoice.invoice}</TableCell>
                  <TableCell className="font-medium">{invoice.customer}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[invoice.status]}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Record Payment</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
