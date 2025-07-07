
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileBarChart, PlusCircle } from "lucide-react";
import { getRecentReports, getClients } from "@/lib/actions";

export default async function ReportingPage() {
  const recentReports = await getRecentReports();
  const clients = await getClients();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reporting Center</h1>
          <p className="text-muted-foreground">
            Generate, customize, and schedule financial reports.
          </p>
        </div>
        <Button variant="outline"><PlusCircle className="mr-2"/>Custom Report Builder</Button>
      </div>

      <Tabs defaultValue="client-reports" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="client-reports">Client Reports</TabsTrigger>
          <TabsTrigger value="firm-analytics" disabled>Firm Analytics</TabsTrigger>
          <TabsTrigger value="report-templates" disabled>Report Templates</TabsTrigger>
          <TabsTrigger value="scheduled-reports" disabled>Scheduled Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="client-reports" className="mt-4 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Report Generator</CardTitle>
                    <CardDescription>Select a client and report to generate.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <label>Client</label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a client"/></SelectTrigger>
                            <SelectContent>
                                {clients.map(client => (
                                    <SelectItem key={client.id} value={client.id}>{client.businessName}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <label>Report</label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a report type"/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pnl">Profit & Loss</SelectItem>
                                <SelectItem value="balance-sheet">Balance Sheet</SelectItem>
                                <SelectItem value="cash-flow">Cash Flow Statement</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <label>Period</label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a period"/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="monthly">This Month</SelectItem>
                                <SelectItem value="quarterly">Last Quarter</SelectItem>
                                <SelectItem value="ytd">Year-to-Date</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full">Generate Report</Button>
                </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>A history of recently generated reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {recentReports.map((report, index) => (
                            <li key={index} className="flex items-center gap-4">
                                <FileBarChart className="h-8 w-8 text-muted-foreground" />
                                <div className="flex-1">
                                    <p className="font-medium">{report.client} - {report.type}</p>
                                    <p className="text-sm text-muted-foreground">Period: {report.period}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{report.generated}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
