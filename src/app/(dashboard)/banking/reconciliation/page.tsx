
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Checkbox } from "@/components/ui/checkbox";
import { getReconciliationData } from "@/lib/actions";

type Transaction = {
    date: string;
    description: string;
    amount: number;
};

export default function ReconciliationPage() {
  const [payments, setPayments] = useState<Transaction[]>([]);
  const [deposits, setDeposits] = useState<Transaction[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<Set<string>>(new Set());
  const [selectedDeposits, setSelectedDeposits] = useState<Set<string>>(new Set());
  
  const [statementBalance, setStatementBalance] = useState(0);
  const [clearedBalance, setClearedBalance] = useState(0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
      async function fetchData() {
          const data = await getReconciliationData();
          setPayments(data.payments.map(p => ({...p, amount: parseFloat(p.amount.replace(/,/g, ''))})));
          setDeposits(data.deposits.map(d => ({...d, amount: parseFloat(d.amount.replace(/,/g, ''))})));
      }
      fetchData();
  }, []);

  useEffect(() => {
      const totalSelectedPayments = Array.from(selectedPayments).reduce((sum, desc) => {
          const payment = payments.find(p => p.description === desc);
          return sum + (payment ? payment.amount : 0);
      }, 0);

      const totalSelectedDeposits = Array.from(selectedDeposits).reduce((sum, desc) => {
          const deposit = deposits.find(d => d.description === desc);
          return sum + (deposit ? deposit.amount : 0);
      }, 0);

      const newClearedBalance = totalSelectedDeposits - totalSelectedPayments;
      setClearedBalance(newClearedBalance);
      setDifference(statementBalance - newClearedBalance);
  }, [selectedPayments, selectedDeposits, statementBalance, payments, deposits]);

  const handleSelect = (description: string, checked: boolean, type: 'payment' | 'deposit') => {
      const currentSet = type === 'payment' ? selectedPayments : selectedDeposits;
      const setFunction = type === 'payment' ? setSelectedPayments : setSelectedDeposits;
      const newSelected = new Set(currentSet);
      if (checked) {
          newSelected.add(description);
      } else {
          newSelected.delete(description);
      }
      setFunction(newSelected);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Bank Reconciliation</h1>
        <p className="text-muted-foreground">
          Compare your records against your bank statement to ensure they match.
        </p>
      </div>

      <Card>
        <CardHeader className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
             <div className="grid gap-2">
                <Label>Account</Label>
                <Select defaultValue="checking">
                    <SelectTrigger><SelectValue placeholder="Select an account"/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="checking">Business Checking (•••• 1234)</SelectItem>
                        <SelectItem value="savings">Savings Account (•••• 4321)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="statement-balance">Statement Ending Balance</Label>
                <Input 
                    id="statement-balance" 
                    type="number" 
                    placeholder="0.00" 
                    onChange={(e) => setStatementBalance(parseFloat(e.target.value) || 0)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="statement-date">Statement Ending Date</Label>
                <Input id="statement-date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
            </div>
            <Button>Start Reconciling</Button>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center border rounded-lg p-4 mb-6">
                <div>
                    <p className="text-sm text-muted-foreground">Cleared Balance</p>
                    <p className="text-xl font-semibold">${clearedBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Statement Balance</p>
                    <p className="text-xl font-semibold">${statementBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Difference</p>
                    <p className={`text-xl font-semibold ${Math.abs(difference) < 0.01 ? 'text-success' : 'text-destructive'}`}>
                        ${difference.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Payments and Debits</h3>
                    <Table>
                        <TableHeader><TableRow><TableHead><Checkbox/></TableHead><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {payments.map((p, i) => (
                                <TableRow key={i} data-state={selectedPayments.has(p.description) ? "selected" : ""}>
                                    <TableCell>
                                        <Checkbox 
                                            onCheckedChange={(checked) => handleSelect(p.description, !!checked, 'payment')}
                                            checked={selectedPayments.has(p.description)}
                                        />
                                    </TableCell>
                                    <TableCell>{p.date}</TableCell>
                                    <TableCell>{p.description}</TableCell>
                                    <TableCell className="text-right">${p.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold mb-2">Deposits and Credits</h3>
                     <Table>
                        <TableHeader><TableRow><TableHead><Checkbox/></TableHead><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {deposits.map((d, i) => (
                                <TableRow key={i} data-state={selectedDeposits.has(d.description) ? "selected" : ""}>
                                    <TableCell>
                                        <Checkbox 
                                            onCheckedChange={(checked) => handleSelect(d.description, !!checked, 'deposit')}
                                            checked={selectedDeposits.has(d.description)}
                                        />
                                    </TableCell>
                                    <TableCell>{d.date}</TableCell>
                                    <TableCell>{d.description}</TableCell>
                                    <TableCell className="text-right">${d.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </CardContent>
         <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Button variant="outline">Save for Later</Button>
          <Button disabled={Math.abs(difference) > 0.01}>Finish Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
