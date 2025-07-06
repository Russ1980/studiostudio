
"use client";

import React from "react";
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Percent, Clock, PlusCircle, FilePlus, Receipt } from "lucide-react";
import Link from "next/link";

export function JobDetailsClientPage({ job: initialJob }: { job: any }) {
  const [job, setJob] = React.useState(initialJob);

  const handleAddChangeOrder = () => {
    const newChangeOrder = {
        id: `CO-00${job.changeOrders.length + 2}`,
        date: new Date().toISOString().split('T')[0],
        description: 'Client requested scope change',
        amount: 2500,
        status: 'Pending'
    };
    setJob((prevJob: any) => ({
        ...prevJob,
        changeOrders: [...prevJob.changeOrders, newChangeOrder]
    }));
  };
  
  const profitability = job.profitability;
  const budgetVsActualProgress = (job.spent / job.budget) * 100;
  const grossMargin = job.budget > 0 ? ((profitability / job.budget) * 100).toFixed(1) : "0.0";

  const kpiData = [
    { title: "Budget", value: `$${job.budget.toLocaleString()}`, icon: DollarSign },
    { title: "Actual Costs", value: `$${job.spent.toLocaleString()}`, icon: DollarSign },
    { title: "Profitability", value: `$${profitability.toLocaleString()}`, icon: DollarSign, isPositive: profitability >= 0 },
    { title: "Gross Margin", value: `${grossMargin}%`, icon: Percent },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">{job.name}</h1>
        <p className="text-muted-foreground">Customer: {job.customer}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${kpi.isPositive === true ? 'text-success' : kpi.isPositive === false ? 'text-destructive' : ''}`}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
          <CardHeader>
              <CardTitle>Budget vs. Actuals</CardTitle>
          </CardHeader>
          <CardContent>
              <Progress value={budgetVsActualProgress} className="h-4"/>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>Spent: ${job.spent.toLocaleString()}</span>
                  <span>Budget: ${job.budget.toLocaleString()}</span>
              </div>
          </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
              <Card>
                  <CardHeader>
                      <CardTitle>Cost Entries</CardTitle>
                      <CardDescription>A detailed log of all costs assigned to this job.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Cost Type</TableHead>
                                  <TableHead>Description</TableHead>
                                  <TableHead className="text-right">Amount</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {job.costEntries.map((entry: any) => (
                                  <TableRow key={entry.id}>
                                      <TableCell>{entry.date}</TableCell>
                                      <TableCell>{entry.type}</TableCell>
                                      <TableCell>{entry.description}</TableCell>
                                      <TableCell className="text-right">${entry.amount.toLocaleString()}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </div>
          <div className="space-y-6">
               <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <Button variant="outline"><Clock className="mr-2"/> Log Time</Button>
                        <Button variant="outline" asChild>
                            <Link href="/operations/job-costing/enter-bill">
                                <Receipt className="mr-2"/> Enter Bill
                            </Link>
                        </Button>
                        <Button variant="outline"><FilePlus className="mr-2"/> Create Invoice</Button>
                    </CardContent>
               </Card>
               <Card>
                    <CardHeader>
                        <CardTitle>Change Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {job.changeOrders.map((co: any) => (
                            <div key={co.id} className="flex justify-between items-center">
                                <p className="text-sm">{co.description}</p>
                                <p className="text-sm font-medium">+${co.amount.toLocaleString()}</p>
                            </div>
                        ))}
                         {job.changeOrders.length === 0 && (
                            <p className="text-sm text-muted-foreground">No change orders yet.</p>
                        )}
                    </CardContent>
                    <CardFooter>
                         <Button variant="secondary" className="w-full" onClick={handleAddChangeOrder}><PlusCircle className="mr-2"/> Add Change Order</Button>
                    </CardFooter>
               </Card>
          </div>
      </div>
    </div>
  )
}
