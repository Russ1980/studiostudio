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
import { FileText, Clock, PlusCircle, Send, Wallet } from "lucide-react";
import Link from "next/link";

const statusVariant: { [key: string]: "success" | "destructive" | "default" } = {
  Paid: "success",
  Overdue: "destructive",
  Sent: "default",
};

export function InvoicingDashboardClientPage({ initialData }: { initialData: any }) {
  const { kpiData, recentInvoices } = initialData;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Invoicing Dashboard</h1>
        <p className="text-muted-foreground">
          A high-level overview of your accounts receivable health and recent activity.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi: any) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentInvoices.map((invoice: any) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.customer}</TableCell>
                                <TableCell>${invoice.amount}</TableCell>
                                <TableCell>{invoice.dueDate}</TableCell>
                                <TableCell><Badge variant={statusVariant[invoice.status as keyof typeof statusVariant]}>{invoice.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Button asChild className="w-full justify-start"><Link href="/invoicing/new"><PlusCircle/>Create Invoice</Link></Button>
                <Button variant="outline" className="w-full justify-start"><Send/>Send Reminders</Button>
                <Button variant="outline" className="w-full justify-start"><Wallet/>Record a Payment</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
