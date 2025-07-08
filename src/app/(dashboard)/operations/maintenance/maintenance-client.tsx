
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Wrench, CircleHelp, AlertTriangle, PlusCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const statusVariant: { [key: string]: "success" | "destructive" | "default" } = {
  "Completed": "success",
  "Overdue": "destructive",
  "In Progress": "default",
  "Scheduled": "default"
};

export function MaintenanceClientPage({ tasks }: { tasks: any[] }) {
    const kpiData = [
        { title: "Scheduled Tasks", value: tasks.filter(t => t.status === "Scheduled").length, icon: Wrench },
        { title: "Tasks In Progress", value: tasks.filter(t => t.status === "In Progress").length, icon: Wrench },
        { title: "Overdue Tasks", value: tasks.filter(t => t.status === "Overdue").length, icon: AlertTriangle },
    ];

  return (
    <div className="grid gap-6">
       <div>
        <h1 className="text-3xl font-bold">Maintenance Management</h1>
        <p className="text-muted-foreground">
          Schedule, track, and log all preventive and reactive maintenance for machinery.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Maintenance Log</CardTitle>
            <Button><PlusCircle className="mr-2"/> Schedule Maintenance</Button>
        </CardHeader>
        <CardContent>
            <TooltipProvider>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Scheduled Date</TableHead>
                        <TableHead>Completed Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell className="font-medium">{task.asset}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                {task.type}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleHelp className="h-4 w-4 text-muted-foreground cursor-pointer"/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{task.type === "Preventive" ? "Routine check-up" : "Repairing a fault"}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell><Badge variant={statusVariant[task.status as keyof typeof statusVariant]}>{task.status}</Badge></TableCell>
                            <TableCell>{task.scheduledDate}</TableCell>
                            <TableCell>{task.completedDate || 'N/A'}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
