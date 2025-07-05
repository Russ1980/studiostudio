
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, ShieldCheck, CheckSquare, CalendarDays, FileUp, Wallet, BarChart } from "lucide-react";

const kpiData = [
  { title: "Total Tax Liability (YTD)", value: "$285,400.00", icon: DollarSign },
  { title: "Upcoming Payments", value: "$45,200.00", icon: Wallet },
  { title: "Compliance Status", value: "98%", icon: ShieldCheck },
  { title: "Filed Returns (YTD)", value: "14", icon: CheckSquare },
];

const deadlines = [
    { form: "Federal Form 941", due: "Due in 12 days", frequency: "Quarterly" },
    { form: "State Form DE 9", due: "Due in 12 days", frequency: "Quarterly" },
    { form: "Federal Form 1120", due: "Due in 2 months", frequency: "Annually" },
];

const recentActivity = [
    { description: "Form 1120 for Apex Solutions was e-filed", time: "1 day ago" },
    { description: "Received IRS acceptance for Q1 941", time: "3 days ago" },
    { description: "State tax payment of $12,345.67 scheduled", time: "5 days ago" },
];

export default function IntelligentTaxDashboardPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Intelligent Tax Dashboard</h1>
        <p className="text-muted-foreground">
          A high-level overview of your company's current tax situation, deadlines, and key metrics.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Action Center</CardTitle>
            <CardDescription>Quick access to common tax tasks.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full justify-start"><FileUp className="mr-2"/> File a Return</Button>
            <Button className="w-full justify-start" variant="outline"><Wallet className="mr-2"/> Make a Payment</Button>
            <Button className="w-full justify-start" variant="outline"><BarChart className="mr-2"/> Generate Tax Report</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Filing Deadlines</CardTitle>
            <CardDescription>Critical upcoming tax filing deadlines.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deadlines.map((deadline, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <CalendarDays className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">{deadline.form}</p>
                        <p className="text-sm text-muted-foreground">{deadline.frequency}</p>
                    </div>
                    <div className="font-medium text-sm text-destructive">
                        {deadline.due}
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
       <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
             <ul className="space-y-4">
                {recentActivity.map((activity, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{activity.description}</span>
                        <span className="text-muted-foreground">{activity.time}</span>
                    </li>
                ))}
            </ul>
          </CardContent>
        </Card>

    </div>
  );
}
