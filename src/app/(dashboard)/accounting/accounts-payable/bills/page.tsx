
"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const bills = [
    { bill: "#B-2024-112", vendor: "Office Supplies Inc.", dueDate: "2024-07-15", amount: "1,200.00", status: "Paid" },
    { bill: "#B-2024-113", vendor: "Cloud Services LLC", dueDate: "2024-07-20", amount: "5,000.00", status: "Awaiting Payment" },
    { bill: "#B-2024-114", vendor: "Marketing Agency Co.", dueDate: "2024-06-30", amount: "10,500.00", status: "Overdue" },
];

export default function BillsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Bills</h1>
                <p className="text-muted-foreground">Manage and track all bills received from vendors.</p>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <Input placeholder="Filter by vendor or bill #" className="max-w-sm"/>
                        <Button><PlusCircle />Enter Bill</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Bill #</TableHead>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bills.map((bill, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{bill.bill}</TableCell>
                                    <TableCell>{bill.vendor}</TableCell>
                                    <TableCell>{bill.dueDate}</TableCell>
                                    <TableCell>${bill.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            bill.status === "Paid" ? "success" :
                                            bill.status === "Overdue" ? "destructive" : "default"
                                        }>{bill.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

