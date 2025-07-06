
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Split } from "lucide-react";

const transactions = [
    { id: 1, date: "2024-07-21", description: "STRIPE PAYOUT", account: "Checking", amount: "+12,500.00", status: "review" },
    { id: 2, date: "2024-07-20", description: "GOOGLE WORKSPACE", account: "Credit Card", amount: "-75.00", status: "review" },
    { id: 3, date: "2024-07-20", description: "AMAZON WEB SERVICES", account: "Credit Card", amount: "-1,234.56", status: "categorized" },
    { id: 4, date: "2024-07-19", description: "Payment from Innovate Inc.", account: "Checking", amount: "+50,000.00", status: "matched" },
];

export default function ReviewTransactionsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Review Transactions</h1>
        <p className="text-muted-foreground">
          Categorize, match, and manage transactions from your bank feeds.
        </p>
      </div>
      <Tabs defaultValue="review" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="review">For Review</TabsTrigger>
          <TabsTrigger value="categorized">Categorized</TabsTrigger>
          <TabsTrigger value="matched">Matched</TabsTrigger>
        </TabsList>
        <TabsContent value="review" className="mt-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>For Review</CardTitle>
                        <Button disabled>Accept Selected</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <TransactionTable transactions={transactions.filter(t => t.status === 'review')} />
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="categorized" className="mt-4">
             <Card>
                <CardHeader><CardTitle>Categorized</CardTitle></CardHeader>
                <CardContent>
                    <TransactionTable transactions={transactions.filter(t => t.status === 'categorized')} />
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="matched" className="mt-4">
            <Card>
                <CardHeader><CardTitle>Matched</CardTitle></CardHeader>
                <CardContent>
                    <TransactionTable transactions={transactions.filter(t => t.status === 'matched')} />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const TransactionTable = ({ transactions }: { transactions: any[] }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-12"><Checkbox /></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category/Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {transactions.map((tx) => (
                <TableRow key={tx.id}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell className="font-medium">{tx.description}</TableCell>
                    <TableCell>{tx.account}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>
                        {tx.status === 'review' && (
                            <div className="flex items-center gap-2">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sales">Sales Revenue</SelectItem>
                                        <SelectItem value="software">Software & Subscriptions</SelectItem>
                                        <SelectItem value="supplies">Office Supplies</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="sm">Find Match</Button>
                                <Button variant="ghost" size="icon"><Split className="h-4 w-4" /></Button>
                            </div>
                        )}
                         {tx.status === 'categorized' && (
                            <span className="text-sm text-muted-foreground">Software & Subscriptions</span>
                        )}
                         {tx.status === 'matched' && (
                            <span className="text-sm text-muted-foreground">Matched to Invoice #INV-2024-047</span>
                        )}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);
