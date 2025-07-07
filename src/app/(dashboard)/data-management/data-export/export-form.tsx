
"use client";

import { useToast } from "@/hooks/use-toast";
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
import { Download, CalendarIcon } from "lucide-react";

export function ExportForm() {
    const { toast } = useToast();

    const handleGenerateExport = () => {
        toast({
            title: "Export Generating...",
            description: "Your file is being prepared and will be available for download shortly.",
        });
    }

    return (
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
                <Button className="w-full" onClick={handleGenerateExport}><Download className="mr-2"/> Generate Export</Button>
            </CardFooter>
        </Card>
    )
}
