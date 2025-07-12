
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
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import { getRecurringInvoices } from "@/lib/actions";
import { useEffect, useState } from "react";

const statusVariant: { [key: string]: "success" | "default" } = {
  Active: "success",
  Paused: "default",
};

export default function RecurringInvoicesPage() {
  const [recurringInvoices, setRecurringInvoices] = useState<any[]>([]);

  useEffect(() => {
    getRecurringInvoices().then(setRecurringInvoices);
  }, []);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recurring Invoices</h1>
          <p className="text-muted-foreground">
            Manage automated billing schedules for repeat customers.
          </p>
        </div>
        <Button asChild>
          <Link href="/invoicing/recurring/new"><PlusCircle className="mr-2"/> Create Recurring Invoice</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Recurring Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Invoice Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recurringInvoices.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.customer}</TableCell>
                  <TableCell>{profile.frequency}</TableCell>
                  <TableCell>{profile.nextDate}</TableCell>
                  <TableCell>${profile.amount}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[profile.status as keyof typeof statusVariant]}>{profile.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem>Pause</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
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
