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
import { MoreHorizontal, PlusCircle, Send, FileCheck2 } from "lucide-react";
import Link from "next/link";

const estimates = [
  { id: "EST-001", customer: "Innovate Inc.", date: "2024-07-10", amount: "12,500.00", status: "Sent" },
  { id: "EST-002", customer: "Apex Solutions", date: "2024-07-08", amount: "8,000.00", status: "Accepted" },
  { id: "EST-003", customer: "QuantumLeap Co.", date: "2024-06-25", amount: "2,500.00", status: "Expired" },
  { id: "EST-004", customer: "New Prospect LLC", date: "2024-07-12", amount: "30,000.00", status: "Draft" },
];

const statusVariant: { [key: string]: "success" | "destructive" | "default" | "secondary" } = {
  Accepted: "success",
  Expired: "destructive",
  Sent: "default",
  Draft: "secondary",
};

export default function EstimatesPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Estimates & Proposals</h1>
          <p className="text-muted-foreground">
            Create and send quotes to potential customers before work begins.
          </p>
        </div>
        <Button asChild>
          <Link href="#"><PlusCircle className="mr-2"/> Create Estimate</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Estimates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estimate #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estimates.map((estimate) => (
                <TableRow key={estimate.id}>
                  <TableCell className="font-mono">{estimate.id}</TableCell>
                  <TableCell className="font-medium">{estimate.customer}</TableCell>
                  <TableCell>{estimate.date}</TableCell>
                  <TableCell>${estimate.amount}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[estimate.status]}>{estimate.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem><Send />Send to Customer</DropdownMenuItem>
                        <DropdownMenuItem><FileCheck2 />Convert to Invoice</DropdownMenuItem>
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
