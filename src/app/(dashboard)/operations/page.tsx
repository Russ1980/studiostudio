"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Zap, TimerCheck, Award, UsersCog, FileText, AlertCircle, PlusCircle, Wrench, BarChart4 } from "lucide-react";

const kpiData = [
  { title: "Production Efficiency (OEE)", value: "85%", icon: Zap },
  { title: "On-Time Delivery", value: "98.2%", icon: TimerCheck },
  { title: "Quality Rate", value: "99.5%", icon: Award },
  { title: "Resource Utilization", value: "78%", icon: UsersCog },
];

const workOrders = [
  { id: "WO-00451", job: "Assemble Product X", status: "In Progress", due: "2024-07-25" },
  { id: "WO-00452", job: "Calibrate Machine B", status: "Pending", due: "2024-07-28" },
];

const alerts = [
  { message: "Low stock warning for Component Y.", priority: "High" },
  { message: "Machine B maintenance is overdue.", priority: "Medium" },
];

const statusVariant: { [key: string]: "default" | "secondary" } = {
  "In Progress": "default",
  "Pending": "secondary",
};

export default function OperationsDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Operations Dashboard</h1>
        <p className="text-muted-foreground">
          A real-time overview of production, delivery, quality, and alerts.
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
        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Open Work Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Job Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Due Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {workOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.job}</TableCell>
                                    <TableCell><Badge variant={statusVariant[order.status]}>{order.status}</Badge></TableCell>
                                    <TableCell>{order.due}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Alerts & Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {alerts.map((alert, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <AlertCircle className="h-5 w-5 text-destructive mt-1"/>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button className="w-full justify-start"><PlusCircle className="mr-2"/> Create Work Order</Button>
                    <Button variant="outline" className="w-full justify-start"><Wrench className="mr-2"/> Schedule Maintenance</Button>
                    <Button variant="outline" className="w-full justify-start"><BarChart4 className="mr-2"/> Generate Report</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
