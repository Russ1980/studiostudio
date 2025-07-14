
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Percent, Clock, PlusCircle } from "lucide-react";

export function JobDetailsClientPage({ job }: { job: any }) {
    const profit = job.profitability;
    const margin = job.budget > 0 ? ((profit / (job.budget + profit)) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{job.name}</h1>
            <p className="text-muted-foreground">
                A detailed financial and operational view of the job.
            </p>
          </div>
          <Button><PlusCircle className="mr-2"/> Add Cost Entry</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Budget</CardTitle><DollarSign/></CardHeader>
                <CardContent><div className="text-2xl font-bold">${job.budget.toLocaleString()}</div></CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Actual Costs</CardTitle><DollarSign/></CardHeader>
                <CardContent><div className="text-2xl font-bold">${job.spent.toLocaleString()}</div></CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Gross Profit</CardTitle><DollarSign/></CardHeader>
                <CardContent><div className={`text-2xl font-bold ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>${profit.toLocaleString()}</div></CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Profit Margin</CardTitle><Percent/></CardHeader>
                <CardContent><div className={`text-2xl font-bold ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>{margin}%</div></CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader><CardTitle>Budget vs. Actual Costs</CardTitle></CardHeader>
            <CardContent>
                <Progress value={(job.spent / job.budget) * 100} className="h-4" />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${job.spent.toLocaleString()} of ${job.budget.toLocaleString()} spent</span>
                    <span>${(job.budget - job.spent).toLocaleString()} remaining</span>
                </div>
            </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader><CardTitle>Cost Breakdown</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {job.costEntries.map((entry: any) => (
                                <TableRow key={entry.id}><TableCell>{entry.date}</TableCell><TableCell>{entry.type}</TableCell><TableCell>{entry.description}</TableCell><TableCell className="text-right">${entry.amount.toLocaleString()}</TableCell></TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Change Orders</CardTitle></CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                           {job.changeOrders.map((order: any) => (
                                <TableRow key={order.id}><TableCell>{order.date}</TableCell><TableCell>{order.description}</TableCell><TableCell><Badge>{order.status}</Badge></TableCell><TableCell className="text-right">${order.amount.toLocaleString()}</TableCell></TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

    </div>
  );
}
