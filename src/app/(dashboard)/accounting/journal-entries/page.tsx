
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal } from "lucide-react";

const entries = [
  { date: "2024-06-15", entryNo: "JE-001", ref: "Depreciation", description: "Monthly depreciation expense for office equipment.", debits: "1,500.00", credits: "1,500.00", status: "Posted" },
  { date: "2024-06-10", entryNo: "JE-002", ref: "Owner's Draw", description: "Owner withdrawal for personal use.", debits: "5,000.00", credits: "5,000.00", status: "Posted" },
  { date: "2024-06-01", entryNo: "JE-003", ref: "Accrued Revenue", description: "To recognize revenue earned but not yet invoiced.", debits: "10,000.00", credits: "10,000.00", status: "Draft" },
];

export default function JournalEntriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Journal Entries</h1>
        <p className="text-muted-foreground">
          Make manual adjustments and non-standard entries.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Input placeholder="Filter by description/reference..." className="max-w-sm" />
            <Button asChild>
              <Link href="/accounting/journal-entries/new"><PlusCircle />New Journal Entry</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Entry No.</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Debits</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.entryNo}</TableCell>
                  <TableCell>{entry.ref}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>${entry.debits}</TableCell>
                  <TableCell>${entry.credits}</TableCell>
                  <TableCell><Badge variant={entry.status === 'Posted' ? 'success' : 'default'}>{entry.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View/Edit</DropdownMenuItem>
                        {entry.status === 'Draft' && <DropdownMenuItem>Post Journal</DropdownMenuItem>}
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
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
