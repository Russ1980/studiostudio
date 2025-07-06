
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';

import { FileDown, FileUp, History, ShieldQuestion, Database, CheckSquare, HardDrive } from "lucide-react";

const kpiData = [
  { title: "Data Quality Score", value: "92%", icon: CheckSquare, progress: 92 },
  { title: "Records Managed", value: "1,482,309", icon: Database },
  { title: "Storage Usage", value: "45%", icon: HardDrive, progress: 45 },
  { title: "Data Completeness", value: "88%", icon: CheckSquare, progress: 88 },
];

const recentActivity = [
    { description: "Full system backup completed successfully.", time: "2 hours ago" },
    { description: "Imported 524 new customer records from CSV.", time: "1 day ago" },
    { description: "Exported Q2 Financials to PDF.", time: "2 days ago" },
];

export default function DataManagementDashboard() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Data Management Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of data health, storage usage, and recent activities.
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
              {kpi.progress !== undefined && <Progress value={kpi.progress} className="h-2 mt-2" />}
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button className="w-full justify-start" asChild><Link href="/data-management/data-import"><FileDown className="mr-2"/> Import Data</Link></Button>
                    <Button variant="outline" className="w-full justify-start" asChild><Link href="/data-management/data-export"><FileUp className="mr-2"/> Export Data</Link></Button>
                    <Button variant="outline" className="w-full justify-start" asChild><Link href="/data-management/backup-restore"><History className="mr-2"/> Backup & Restore</Link></Button>
                    <Button variant="outline" className="w-full justify-start"><ShieldQuestion className="mr-2"/> View Audit Logs</Button>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of the latest data operations.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">{activity.description}</span>
                                <span className="text-sm text-muted-foreground">{activity.time}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
