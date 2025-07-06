import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Download, Printer } from "lucide-react";
import { getWipReportData } from "@/lib/actions";

export default async function WipReportPage() {
  const wipData = await getWipReportData();

  const totals = wipData.reduce((acc, job) => {
    acc.contractAmount += job.contractAmount;
    acc.estimatedCost += job.estimatedCost;
    acc.costToDate += job.costToDate;
    acc.revenueEarned += job.revenueEarned;
    acc.billedToDate += job.billedToDate;
    acc.overUnderBilling += job.overUnderBilling;
    return acc;
  }, {
    contractAmount: 0,
    estimatedCost: 0,
    costToDate: 0,
    revenueEarned: 0,
    billedToDate: 0,
    overUnderBilling: 0,
  });

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Work In Progress (WIP) Report</h1>
            <p className="text-muted-foreground">Track the financial status of ongoing jobs.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Printer /> Print</Button>
            <Button><Download /> Export</Button>
          </div>
       </div>

       <Card>
          <CardHeader>
            <CardTitle>WIP Summary</CardTitle>
            <CardDescription>As of {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job</TableHead>
                        <TableHead className="text-right">Contract Amount</TableHead>
                        <TableHead className="text-right">Est. Cost</TableHead>
                        <TableHead className="text-right">Cost to Date</TableHead>
                        <TableHead className="text-right">% Complete</TableHead>
                        <TableHead className="text-right">Revenue Earned</TableHead>
                        <TableHead className="text-right">Billed to Date</TableHead>
                        <TableHead className="text-right">Over/Under</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {wipData.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.jobName}</TableCell>
                            <TableCell className="text-right">${job.contractAmount.toLocaleString()}</TableCell>
                            <TableCell className="text-right">${job.estimatedCost.toLocaleString()}</TableCell>
                            <TableCell className="text-right">${job.costToDate.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{job.percentComplete}%</TableCell>
                            <TableCell className="text-right">${job.revenueEarned.toLocaleString()}</TableCell>
                            <TableCell className="text-right">${job.billedToDate.toLocaleString()}</TableCell>
                            <TableCell className={`text-right font-medium ${job.overUnderBilling >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                                ${job.overUnderBilling.toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="font-bold bg-muted/50 text-lg">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">${totals.contractAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${totals.estimatedCost.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${totals.costToDate.toLocaleString()}</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">${totals.revenueEarned.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${totals.billedToDate.toLocaleString()}</TableCell>
                        <TableCell className={`text-right ${totals.overUnderBilling >= 0 ? 'text-foreground' : 'text-destructive'}`}>${totals.overUnderBilling.toLocaleString()}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
          </CardContent>
       </Card>
    </div>
  );
}
