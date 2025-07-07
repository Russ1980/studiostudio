"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FileDown, Eye } from "lucide-react";
import { getPaySlips } from "@/lib/actions";
import { useState, useEffect } from "react";


export default function PaySlipsPage() {
    const [paySlips, setPaySlips] = useState<any[]>([]);

    useEffect(() => {
        getPaySlips().then(setPaySlips);
    }, []);

  return (
    <div className="grid gap-6">
       <div>
          <h1 className="text-3xl font-bold">Pay Slips</h1>
          <p className="text-muted-foreground">
            View, manage, and download individual pay slips for employees.
          </p>
        </div>
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Input placeholder="Filter by employee name..." className="max-w-xs" />
                        <Select>
                            <SelectTrigger className="w-52">
                                <SelectValue placeholder="Filter by pay period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="p1">June 1-15, 2024</SelectItem>
                                <SelectItem value="p2">May 16-31, 2024</SelectItem>
                                <SelectItem value="p3">May 1-15, 2024</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="outline"><FileDown className="mr-2"/> Bulk Download</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Pay Period</TableHead>
                            <TableHead>Pay Date</TableHead>
                            <TableHead>Net Pay</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paySlips.map((slip) => (
                            <TableRow key={slip.id}>
                                <TableCell className="font-medium">{slip.employee}</TableCell>
                                <TableCell>{slip.period}</TableCell>
                                <TableCell>{slip.payDate}</TableCell>
                                <TableCell>${slip.netPay}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon"><Eye className="h-5 w-5"/></Button>
                                        <Button variant="ghost" size="icon"><FileDown className="h-5 w-5"/></Button>
                                    </div>
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
