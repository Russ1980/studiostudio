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

const creditNotes = [
  { id: "CN-001", customer: "Innovate Inc.", date: "2024-07-10", amount: "500.00", status: "Applied" },
  { id: "CN-002", customer: "Apex Solutions", date: "2024-07-05", amount: "250.00", status: "Open" },
  { id: "CN-003", customer: "QuantumLeap Co.", date: "2024-06-20", amount: "100.00", status: "Refunded" },
];

const statusVariant: { [key: string]: "success" | "default" | "secondary" } = {
  Applied: "success",
  Open: "default",
  Refunded: "secondary",
};

export default function CreditNotesPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Credit Notes</h1>
          <p className="text-muted-foreground">
            Issue and manage credits for returns, overpayments, or service issues.
          </p>
        </div>
        <Button asChild>
          <Link href="#"><PlusCircle className="mr-2"/> Create Credit Note</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Credit Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Credit Note #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creditNotes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell className="font-mono">{note.id}</TableCell>
                  <TableCell className="font-medium">{note.customer}</TableCell>
                  <TableCell>{note.date}</TableCell>
                  <TableCell>${note.amount}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[note.status]}>{note.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Apply to Invoice</DropdownMenuItem>
                        <DropdownMenuItem>Record Refund</DropdownMenuItem>
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
