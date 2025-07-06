
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";
import { Download, CalendarIcon } from "lucide-react";


const exportHistory = [
    { date: "2024-07-22", dataSet: "All Transactions", format: "CSV", status: "Completed" },
    { date: "2024-07-21", dataSet: "Customers", format: "Excel", status: "Completed" },
    { date: "2024-07-20", dataSet: "Financial Statements", format: "PDF", status: "Failed" },
];

const statusVariant: { [key: string]: "success" | "destructive" } = {
  Completed: "success",
  Failed: "destructive",
};

export default function DataExportPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Data Export</h1>
                <p className="text-muted-foreground">
                    Export data out of the application for external analysis, reporting, or local backup.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Export</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Data Set</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select data to export"/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="transactions">All Transactions</SelectItem>
                                        <SelectItem value="customers">Customers</SelectItem>
                                        <SelectItem value="invoices">Invoices</SelectItem>
                                        <SelectItem value="financials">Financial Statements</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="grid gap-2">
                                <Label>Date Range</Label>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2" />
                                    Pick a date range
                                </Button>
                            </div>
                            <div className="grid gap-2">
                                <Label>File Format</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select format"/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="csv">CSV</SelectItem>
                                        <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                                        <SelectItem value="pdf">PDF</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full"><Download className="mr-2"/> Generate Export</Button>
                        </CardFooter>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Export History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Data Set</TableHead>
                                        <TableHead>Format</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {exportHistory.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.dataSet}</TableCell>
                                            <TableCell>{item.format}</TableCell>
                                            <TableCell><Badge variant={statusVariant[item.status]}>{item.status}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                {item.status === 'Completed' && <Button variant="outline" size="sm">Download</Button>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                 </div>
            </div>
        </div>
    )
}
