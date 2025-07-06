
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
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
import { Banknote, CreditCard, Link as LinkIcon, ArrowLeftRight, RefreshCw } from "lucide-react";
import Link from "next/link";

const accounts = [
    { name: "Business Checking", bank: "Chase Bank", lastFour: "1234", balance: "1,250,320.50", type: "bank" },
    { name: "Business Credit Card", bank: "American Express", lastFour: "5678", balance: "12,500.00", type: "credit" },
    { name: "Savings Account", bank: "Chase Bank", lastFour: "4321", balance: "500,000.00", type: "bank" },
];

const transactions = [
    { date: "2024-07-21", description: "STRIPE PAYOUT", account: "Checking", amount: "+$12,500.00" },
    { date: "2024-07-20", description: "GOOGLE WORKSPACE", account: "Credit Card", amount: "-$75.00" },
    { date: "2024-07-20", description: "AMAZON WEB SERVICES", account: "Credit Card", amount: "-$1,234.56" },
    { date: "2024-07-19", description: "OFFICE SUPPLIES INC", account: "Checking", amount: "-$450.23" },
];

export default function BankingDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Banking Dashboard</h1>
        <p className="text-muted-foreground">
          A real-time overview of your cash position and transactions to review.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
              {account.type === 'bank' ? <Banknote className="h-4 w-4 text-muted-foreground" /> : <CreditCard className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${account.balance}</div>
              <p className="text-xs text-muted-foreground">{account.bank} (•••• {account.lastFour})</p>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button className="w-full justify-start" asChild><Link href="/banking/connections"><LinkIcon/>Connect Account</Link></Button>
                    <Button variant="outline" className="w-full justify-start" asChild><Link href="/banking/transfers"><ArrowLeftRight/>Transfer Funds</Link></Button>
                    <Button variant="outline" className="w-full justify-start" asChild><Link href="/banking/reconciliation"><RefreshCw/>Reconcile</Link></Button>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Transactions to Review</CardTitle>
                    <CardDescription>Review and categorize your latest transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx, index) => (
                                <TableRow key={index}>
                                    <TableCell>{tx.date}</TableCell>
                                    <TableCell className="font-medium">{tx.description}</TableCell>
                                    <TableCell>{tx.amount}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild><Link href="/banking/review-transactions">Review</Link></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="w-full" asChild><Link href="/banking/review-transactions">View All Transactions</Link></Button>
                </CardFooter>
            </Card>
       </div>
    </div>
  );
}
