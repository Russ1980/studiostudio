
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { CalendarIcon, PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export function GeneralLedgerClientPage({ initialData }: { initialData: any }) {
    const { transactions, currentBalance } = initialData;

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
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                 <div className="flex flex-wrap items-center gap-2">
                    <Select defaultValue="checking">
                        <SelectTrigger className="w-64">
                            <SelectValue placeholder="Select an account" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="checking">Main Checking Account</SelectItem>
                            <SelectItem value="ar">Accounts Receivable</SelectItem>
                            <SelectItem value="ap">Accounts Payable</SelectItem>
                            <SelectItem value="sales">Sales Revenue</SelectItem>
                            <SelectItem value="cogs">Cost of Goods Sold</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Date Range</span>
                    </Button>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Filter by description..." className="pl-9" />
                    </div>
                </div>
                 <Button asChild>
                    <Link href="/accounting/journal-entries/new"><PlusCircle className="mr-2"/> New Journal Entry</Link>
                </Button>
            </div>
             <div className="mt-4 border-t pt-4">
                <CardTitle>Main Checking Account</CardTitle>
                <CardDescription className="flex justify-between items-center">
                    <span>A detailed record of all transactions for this account.</span>
                    <span className="text-lg font-semibold">Current Balance: ${currentBalance}</span>
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Journal No.</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead className="text-right">Running Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.journalNo}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell className="text-right">{tx.debit ? `$${tx.debit}`: ''}</TableCell>
                  <TableCell className="text-right">{tx.credit ? `$${tx.credit}`: ''}</TableCell>
                  <TableCell className="text-right">${tx.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

