
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
  TableFooter as TFoot
} from "@/components/ui/table";
import { CalendarIcon, Download, Printer } from "lucide-react";
import { getArAgingData } from "@/lib/actions";

export default async function ARAgingPage() {
  const agingData = await getArAgingData();
  
  const totals = agingData.reduce((acc, row) => {
    acc.current += parseFloat(row.current);
    acc['1-30'] += parseFloat(row['1-30']);
    acc['31-60'] += parseFloat(row['31-60']);
    acc['61-90'] += parseFloat(row['61-90']);
    acc['90+'] += parseFloat(row['90+']);
    acc.total += parseFloat(row.total);
    return acc;
  }, { current: 0, '1-30': 0, '31-60': 0, '61-90': 0, '90+': 0, total: 0 });

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">A/R Aging Summary</h1>
            <p className="text-muted-foreground">As of {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><CalendarIcon /> As of Date</Button>
            <Button variant="outline"><Printer /> Print</Button>
            <Button><Download /> Export</Button>
          </div>
       </div>
       <Card>
            <CardContent className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="text-right">Current</TableHead>
                            <TableHead className="text-right">1 - 30 Days</TableHead>
                            <TableHead className="text-right">31 - 60 Days</TableHead>
                            <TableHead className="text-right">61 - 90 Days</TableHead>
                            <TableHead className="text-right">90+ Days</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agingData.map((row) => (
                            <TableRow key={row.customer}>
                                <TableCell className="font-medium">{row.customer}</TableCell>
                                <TableCell className="text-right">${parseFloat(row.current).toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                <TableCell className="text-right">${parseFloat(row["1-30"]).toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                <TableCell className="text-right">${parseFloat(row["31-60"]).toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                <TableCell className="text-right">${parseFloat(row["61-90"]).toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                <TableCell className="text-right">${parseFloat(row["90+"]).toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                <TableCell className="text-right font-bold">${parseFloat(row.total).toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TFoot>
                        <TableRow className="font-bold bg-muted/50 text-lg">
                            <TableCell>Total</TableCell>
                            <TableCell className="text-right">${totals.current.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                            <TableCell className="text-right">${totals['1-30'].toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                            <TableCell className="text-right">${totals['31-60'].toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                            <TableCell className="text-right">${totals['61-90'].toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                            <TableCell className="text-right">${totals['90+'].toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                            <TableCell className="text-right">${totals.total.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                        </TableRow>
                    </TFoot>
                </Table>
            </CardContent>
       </Card>
    </div>
  );
}
