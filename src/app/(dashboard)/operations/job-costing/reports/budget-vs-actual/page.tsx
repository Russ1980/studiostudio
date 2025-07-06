
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
import { Download, Printer } from "lucide-react";
import { getJobs } from "@/lib/actions";
import { BudgetVsActualClient } from "./budget-vs-actual-client";

type Job = {
  id: string;
  name: string;
  customer: string;
  status: string;
  budget: number;
  spent: number;
  profitability: number;
};

export default async function BudgetVsActualPage() {
  const jobs: Job[] = await getJobs();

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Budget vs. Actual Report</h1>
            <p className="text-muted-foreground">Compare budgeted costs to actual spending across all jobs.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Printer /> Print</Button>
            <Button><Download /> Export</Button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Detailed Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Job Name</TableHead>
                                    <TableHead className="text-right">Budget</TableHead>
                                    <TableHead className="text-right">Actual</TableHead>
                                    <TableHead className="text-right">Variance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobs.map((job) => {
                                    const variance = job.budget - job.spent;
                                    return (
                                        <TableRow key={job.id}>
                                            <TableCell className="font-medium">{job.name}</TableCell>
                                            <TableCell className="text-right">${job.budget.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">${job.spent.toLocaleString()}</TableCell>
                                            <TableCell className={`text-right font-medium ${variance >= 0 ? 'text-success' : 'text-destructive'}`}>
                                                {variance < 0 ? `-$${Math.abs(variance).toLocaleString()}` : `$${variance.toLocaleString()}`}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                 </Card>
            </div>
            <div className="lg:col-span-2">
                 <BudgetVsActualClient jobs={jobs} />
            </div>
       </div>
    </div>
  );
}
