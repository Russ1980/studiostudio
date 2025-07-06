
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
import { CircleCheck, Clock, Settings, HardHat, AlertCircle } from "lucide-react";

const trackingData = [
  {
    title: "Production Plan PP-001 (Widget A)",
    progress: 60,
    status: "On Track",
    details: "600 of 1,000 units completed.",
  },
  {
    title: "Production Plan PP-004 (Widget A - Rush)",
    progress: 90,
    status: "On Track",
    details: "180 of 200 units completed.",
  },
  {
    title: "Production Plan PP-002 (Component B)",
    progress: 15,
    status: "Delayed",
    details: "750 of 5,000 units completed. Material shortage reported.",
  },
];

export default function ProductionTrackingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Production Tracking & Monitoring</h1>
        <p className="text-muted-foreground">
          Real-time visibility into production progress, delays, and quality control.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-Time Production Progress</CardTitle>
          <CardDescription>
            Live status of all active production plans.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {trackingData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{item.title}</span>
                <span className={`text-sm font-semibold ${item.status === 'Delayed' ? 'text-destructive' : 'text-success'}`}>{item.status}</span>
              </div>
              <Progress value={item.progress} />
              <p className="text-sm text-muted-foreground mt-2">{item.details}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="bg-secondary p-3 rounded-lg"><HardHat className="h-6 w-6 text-secondary-foreground" /></div>
                <CardTitle>Shop Floor Control</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Operators can log task updates via barcode scans or terminals.</p>
                <Button variant="outline" className="w-full">View Shop Floor Terminal</Button>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                 <div className="bg-secondary p-3 rounded-lg"><Clock className="h-6 w-6 text-secondary-foreground" /></div>
                <CardTitle>Downtime Tracking</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Log and analyze issues like machine breakdowns to improve uptime.</p>
                <Button variant="outline" className="w-full">Log Downtime Event</Button>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                 <div className="bg-secondary p-3 rounded-lg"><CircleCheck className="h-6 w-6 text-secondary-foreground" /></div>
                <CardTitle>Quality Checks</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Schedule and record quality inspections at key production stages.</p>
                <Button variant="outline" className="w-full">Perform Quality Check</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
