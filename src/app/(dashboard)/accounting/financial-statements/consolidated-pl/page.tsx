
"use client";

import {
  Card,
  CardContent,
  CardHeader
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
import { Eye, RefreshCw } from "lucide-react";

const data = {
    income: [
        { account: 'Consulting - Interco', parent: 1000, child2: 0, child1: 0, eliminations: -1000 },
        { account: 'Sales', parent: 107366.73, child2: 28366.73, child1: 28366.73, eliminations: -3000 },
        { account: 'Sales (deleting) (in use)', parent: 600, child2: 0, child1: 0, eliminations: 0 },
        { account: 'Sales of Product Income', parent: 2760, child2: 60, child1: 60, eliminations: 0 },
    ],
    cogs: [
        { account: 'Cost of Goods Sold', parent: 900, child2: 150, child1: 150, eliminations: 0 },
    ],
    expenses: [
        { account: 'Advertising & Marketing', parent: 1500, child2: 6000, child1: 9000, eliminations: -3000 },
    ]
};

const calculateTotal = (items: any[]) => items.reduce((acc, item) => acc + item.parent + item.child2 + item.child1 + item.eliminations, 0);
const sumField = (items: any[], field: string) => items.reduce((acc, item) => acc + (item[field] || 0), 0);

const totalIncome = calculateTotal(data.income);
const totalCogs = calculateTotal(data.cogs);
const grossProfit = totalIncome - totalCogs;

const formatCurrency = (value: number) => {
    if (value === 0) return '-';
    const options = { style: 'currency', currency: 'USD', minimumFractionDigits: 2 };
    if (value < 0) {
        return `-$${Math.abs(value).toLocaleString('en-US', options).replace('$', '')}`;
    }
    return value.toLocaleString('en-US', options);
};

export default function ConsolidatedPLPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Consolidated Profit and Loss</h1>
            <p className="text-muted-foreground">January-December, 2024</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="last-year">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Report period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="last-year">Last year</SelectItem>
                    <SelectItem value="this-year">This year</SelectItem>
                </SelectContent>
            </Select>
             <Select defaultValue="accrual">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Accounting method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="accrual">Accrual</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline"><Eye className="mr-2 h-4 w-4" /> View options</Button>
          </div>
       </div>

       <Card>
        <CardHeader className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold">Consolidated Profit and Loss</h2>
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Last updated a few seconds ago</span>
                <Button variant="ghost" size="sm"><RefreshCw className="mr-2 h-4 w-4" /> Refresh report</Button>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/4">Account</TableHead>
                        <TableHead className="text-right">Dan's IES Test - Parent</TableHead>
                        <TableHead className="text-right">Dan's IES Test - Child 2</TableHead>
                        <TableHead className="text-right">Dan's IES Test - Child 1</TableHead>
                        <TableHead className="text-right">Eliminations</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="font-bold bg-muted/20">
                        <TableCell>Income</TableCell>
                        <TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell>
                    </TableRow>
                    {data.income.map(item => (
                        <TableRow key={item.account}>
                            <TableCell className="pl-8">{item.account}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.parent)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.child2)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.child1)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.eliminations)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.parent + item.child2 + item.child1 + item.eliminations)}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow className="font-bold border-t">
                        <TableCell>Total for Income</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.income, 'parent'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.income, 'child2'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.income, 'child1'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.income, 'eliminations'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalIncome)}</TableCell>
                    </TableRow>
                     <TableRow className="font-bold bg-muted/20">
                        <TableCell>Cost of Goods Sold</TableCell>
                        <TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell>
                    </TableRow>
                     {data.cogs.map(item => (
                        <TableRow key={item.account}>
                            <TableCell className="pl-8">{item.account}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.parent)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.child2)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.child1)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.eliminations)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.parent + item.child2 + item.child1 + item.eliminations)}</TableCell>
                        </TableRow>
                    ))}
                     <TableRow className="font-bold border-t">
                        <TableCell>Total for Cost of Goods Sold</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.cogs, 'parent'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.cogs, 'child2'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.cogs, 'child1'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.cogs, 'eliminations'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalCogs)}</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-y-2 border-foreground bg-muted/50">
                        <TableCell>Gross Profit</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.income, 'parent') - sumField(data.cogs, 'parent'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.income, 'child2') - sumField(data.cogs, 'child2'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.income, 'child1') - sumField(data.cogs, 'child1'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(sumField(data.income, 'eliminations') - sumField(data.cogs, 'eliminations'))}</TableCell>
                        <TableCell className="text-right">{formatCurrency(grossProfit)}</TableCell>
                    </TableRow>
                    <TableRow className="font-bold bg-muted/20">
                        <TableCell>Expenses</TableCell>
                        <TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell><TableCell></TableCell>
                    </TableRow>
                     {data.expenses.map(item => (
                        <TableRow key={item.account}>
                            <TableCell className="pl-8">{item.account}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.parent)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.child2)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.child1)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.eliminations)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.parent + item.child2 + item.child1 + item.eliminations)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
