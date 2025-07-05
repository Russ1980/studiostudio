
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar as CalendarIcon, Download } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const reports = [
    { name: "Payroll Register", description: "Detailed breakdown of earnings, deductions, and taxes for each employee." },
    { name: "Tax Liability Summary", description: "Summary of federal, state, and local tax liabilities for a given period." },
    { name: "Employee Summary", description: "Comprehensive summary of individual employee payroll data." },
    { name: "Benefits Summary", description: "Report on employee benefit contributions and costs." },
    { name: "Time & Attendance Report", description: "Detailed log of employee hours worked, overtime, and leave." },
    { name: "YTD Payroll Summary", description: "Year-to-date summary of all payroll activity." },
];

export default function ReportsPage() {
  return (
    <div className="grid gap-6">
       <div>
          <h1 className="text-3xl font-bold">Payroll Reports</h1>
          <p className="text-muted-foreground">
            Generate and download standard and custom payroll reports.
          </p>
        </div>
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CardTitle>Report Library</CardTitle>
                        <CardDescription>Select a report to generate and set the desired date range.</CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" className="w-full sm:w-auto">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Date Range</span>
                        </Button>
                        <Button className="w-full sm:w-auto">
                            <Download className="mr-2 h-4 w-4" />
                            <span>Generate & Download</span>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {reports.map((report, index) => (
                        <li key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                    <FileText className="h-5 w-5 text-secondary-foreground" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{report.name}</p>
                                    <p className="text-sm text-muted-foreground max-w-lg">{report.description}</p>
                                </div>
                            </div>
                            <div className="flex sm:ml-auto gap-2">
                                <Button variant="outline" size="sm">Preview</Button>
                                <Button size="sm">Generate</Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    </div>
  );
}
