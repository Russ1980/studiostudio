
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileBarChart2, Users, PieChart } from "lucide-react";
import Link from "next/link";

const reports = [
    { title: "A/R Aging Summary", description: "Shows outstanding invoices grouped by how long they are overdue.", icon: FileBarChart2, href: "/invoicing/reports/ar-aging" },
    { title: "Sales by Customer", description: "Ranks customers by total sales, helping you identify your most valuable clients.", icon: Users, href: "/invoicing/reports/sales-by-customer" },
    { title: "Sales by Item/Service", description: "Provides a breakdown of sales by each product or service you offer.", icon: PieChart, href: "/invoicing/reports/sales-by-item" },
    { title: "Sales Tax Summary", description: "Summarizes taxable sales and collected sales tax for easier filing.", icon: FileBarChart2, href: "/invoicing/reports/tax-summary" },
];

export default function InvoicingReportsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Invoicing & Sales Reports</h1>
                <p className="text-muted-foreground">
                    A hub for all reports specifically related to sales and invoicing.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report, index) => (
                    <Link href={report.href} key={index}>
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg">
                                    <report.icon className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <div>
                                    <CardTitle>{report.title}</CardTitle>
                                    <CardDescription>{report.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline">View Report</Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
