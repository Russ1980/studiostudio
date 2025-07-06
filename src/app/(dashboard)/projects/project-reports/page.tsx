

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Clock, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const reports = [
    { title: "Project Profitability", description: "Shows revenue, costs, and profit margins for each project.", icon: DollarSign, href: "/operations/job-costing/reports/profitability" },
    { title: "Budget vs. Actuals", description: "Compares your budgeted amounts to your actual project spending.", icon: BarChart3, href: "/operations/job-costing/reports/budget-vs-actual" },
    { title: "Time Tracking Summary", description: "Breaks down hours logged by project, task, and team member.", icon: Clock, href: "#", disabled: true },
    { title: "Resource Allocation", description: "Analyzes how team members' time is distributed across projects.", icon: Users, href: "#", disabled: true },
];

export default function ProjectReportsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Project Reports</h1>
                <p className="text-muted-foreground">
                    Analyze project performance, profitability, and resource allocation.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report, index) => (
                     <Link href={report.href} key={index} className={report.disabled ? 'pointer-events-none' : ''}>
                        <Card className={cn("h-full transition-colors", !report.disabled && "hover:bg-muted/50")}>
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
                                <Button variant="outline" disabled={report.disabled}>{report.disabled ? 'Coming Soon' : 'View Report'}</Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
