
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { CalendarIcon } from "lucide-react";

const transactions = [
    { date: "2024-06-20", journalNo: "INV-2024-050", description: "Payment from Apex Solutions", debit: "12,500.00", credit: "", balance: "1,250,320.50" },
    { date: "2024-06-18", journalNo: "BILL-2024-112", description: "Payment to Office Supplies Inc.", debit: "", credit: "1,200.00", balance: "1,237,820.50" },
    { date: "2024-06-15", journalNo: "JE-001", description: "Monthly depreciation expense", debit: "", credit: "1,500.00", balance: "1,239,020.50" },
    { date: "2024-06-10", journalNo: "JE-002", description: "Owner withdrawal", debit: "", credit: "5,000.00", balance: "1,240,520.50" },
];

export default function GeneralLedgerPage() {
  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-3xl font-bold">General Ledger</h1>
        <p className="text-muted-foreground">
          View a detailed, transaction-level history for any account.
        </p>
      </div>
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Select>
                    <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="checking">Main Checking Account</SelectItem>
                        <SelectItem value="ar">Accounts Receivable</SelectItem>
                        <SelectItem value="ap">Accounts Payable</SelectItem>
                    </SelectContent>
                </Select>
                 <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Date Range</span>
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Journal No.</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Debit</TableHead>
                <TableHead>Credit</TableHead>
                <TableHead>Running Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, index) => (
                <TableRow key={index}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.journalNo}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell>{tx.debit ? `$${tx.debit}`: ''}</TableCell>
                  <TableCell>{tx.credit ? `$${tx.credit}`: ''}</TableCell>
                  <TableCell>${tx.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
