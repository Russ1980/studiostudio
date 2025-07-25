
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { FilePlus } from "lucide-react";

const statusVariant: { [key: string]: "success" | "default" } = {
  Processed: "success",
  Pending: "default",
  Draft: "default",
};


export function PayRunsClientPage({ payRuns }: { payRuns: any[] }) {
  return (
    <div className="grid gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pay Runs</h1>
            <p className="text-muted-foreground">
                A historical log of all payrolls that have been processed.
            </p>
          </div>
          <Button><FilePlus className="mr-2"/> Start New Pay Run</Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Pay Run History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pay Period</TableHead>
                            <TableHead>Pay Date</TableHead>
                            <TableHead>Gross Pay</TableHead>
                            <TableHead>Taxes</TableHead>
                            <TableHead>Net Pay</TableHead>
                            <TableHead>Employees</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {payRuns.map((run, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{run.period}</TableCell>
                            <TableCell>{run.payDate}</TableCell>
                            <TableCell>${run.gross}</TableCell>
                            <TableCell>${run.taxes}</TableCell>
                            <TableCell>${run.net}</TableCell>
                            <TableCell>{run.employees}</TableCell>
                            <TableCell><Badge variant={statusVariant[run.status as keyof typeof statusVariant]}>{run.status}</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
             <CardFooter className="flex items-center justify-end">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                </div>
            </CardFooter>
        </Card>

    </div>
  );
}
