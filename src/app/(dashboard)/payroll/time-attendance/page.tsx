
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, Calendar, AlertTriangle } from "lucide-react";
import { getTimeAndAttendanceData } from "@/lib/actions";
import { useState, useEffect } from "react";

const statusVariant: { [key: string]: "success" | "default" } = {
  Approved: "success",
  Pending: "default",
};

const kpiIconMap: { [key: string]: React.ElementType } = {
    Clock,
    Calendar,
    AlertTriangle,
};

export default function TimeAttendancePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getTimeAndAttendanceData().then(setData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  
  const { kpiData, leaveRequests } = data;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Time & Attendance</h1>
          <p className="text-muted-foreground">
            Track employee hours, manage leave requests, and oversee schedules.
          </p>
        </div>
        <Button>Approve All</Button>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map((kpi: any) => {
            const Icon = kpiIconMap[kpi.icon];
            return (
                <Card key={kpi.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    </CardContent>
                </Card>
            )
        })}
      </div>


      <Tabs defaultValue="leave" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approvals">Timesheet Approvals</TabsTrigger>
          <TabsTrigger value="leave">Leave Requests</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
        </TabsList>
        <TabsContent value="approvals" className="mt-4">
           <Card>
                <CardHeader>
                    <CardTitle>Timesheet Approvals</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                    Placeholder for Timesheet Approvals
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="leave" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Leave Requests</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Leave Type</TableHead>
                                <TableHead>Dates</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaveRequests.map((req: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{req.employee}</TableCell>
                                    <TableCell>{req.type}</TableCell>
                                    <TableCell>{req.dates}</TableCell>
                                    <TableCell><Badge variant={statusVariant[req.status as keyof typeof statusVariant]}>{req.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="schedules" className="mt-4">
           <Card>
                <CardHeader>
                    <CardTitle>Team Schedules</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                    Placeholder for Schedules
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
