
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { FileBarChart } from "lucide-react";

const reports = [
    { title: "Profit & Loss", description: "Shows revenues and expenses over a period of time.", href: "/accounting/financial-statements/profit-and-loss" },
    { title: "Consolidated Profit & Loss", description: "A P&L report for companies with multiple entities or subsidiaries.", href: "/accounting/financial-statements/consolidated-pl" },
    { title: "Balance Sheet", description: "A snapshot of your assets, liabilities, and equity.", href: "/accounting/financial-statements/balance-sheet" },
    { title: "Statement of Cash Flows", description: "Tracks the movement of cash from operating, investing, and financing activities.", href: "/accounting/financial-statements/cash-flow" },
    { title: "Trial Balance", description: "A list of all ledger balances to verify mathematical accuracy.", href: "/reports/trial-balance" },
    { title: "General Ledger", description: "A complete record of all financial transactions.", href: "/accounting/general-ledger" },
];

export default function FinancialStatementsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Financial Statements</h1>
                <p className="text-muted-foreground">
                    Generate and view your company's key financial reports.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report, index) => (
                    <Link href={report.href} key={index}>
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="bg-secondary p-3 rounded-lg">
                                        <FileBarChart className="h-6 w-6 text-secondary-foreground" />
                                    </div>
                                    <CardTitle>{report.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{report.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
