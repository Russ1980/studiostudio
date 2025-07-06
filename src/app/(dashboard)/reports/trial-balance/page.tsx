
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";
import { CalendarIcon, Printer, Download } from "lucide-react";
import { getTrialBalanceData } from "@/lib/actions";

export default async function TrialBalancePage() {
    const trialBalanceData = await getTrialBalanceData();
    const { accounts, totals } = trialBalanceData;

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trial Balance</h1>
            <p className="text-muted-foreground">As of {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><CalendarIcon />Date</Button>
            <Button variant="outline"><Printer />Print</Button>
            <Button><Download />Export</Button>
          </div>
       </div>

       <Card>
        <CardHeader>
            <CardTitle>Trial Balance Report</CardTitle>
            <CardDescription>A list of all accounts in the general ledger and their balances to verify that debits equal credits.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Debit</TableHead>
                        <TableHead className="text-right">Credit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {accounts.map((account, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{account.name}</TableCell>
                            <TableCell className="text-right font-mono">{account.debit > 0 ? `$${account.debit.toLocaleString('en-US', {minimumFractionDigits: 2})}` : ''}</TableCell>
                            <TableCell className="text-right font-mono">{account.credit > 0 ? `$${account.credit.toLocaleString('en-US', {minimumFractionDigits: 2})}` : ''}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="bg-muted font-bold text-lg">
                        <TableCell>Totals</TableCell>
                        <TableCell className="text-right font-mono">${totals.debit.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                        <TableCell className="text-right font-mono">${totals.credit.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
