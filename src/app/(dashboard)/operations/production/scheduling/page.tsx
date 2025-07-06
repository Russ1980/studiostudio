"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export default function SchedulingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Production Scheduling</h1>
          <p className="text-muted-foreground">
            Visualize the production schedule and manage resource allocation.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">Day</Button>
            <Button variant="secondary">Week</Button>
            <Button variant="outline">Month</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Gantt Chart</CardTitle>
            <CardDescription>Drag and drop tasks to adjust the schedule.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[500px] flex items-center justify-center bg-muted/50 rounded-lg">
            <div className="text-center">
                <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground"/>
                <p className="mt-4 text-muted-foreground">Gantt Chart placeholder</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
