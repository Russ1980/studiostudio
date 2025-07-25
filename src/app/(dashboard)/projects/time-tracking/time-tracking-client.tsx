
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

export function TimeTrackingClientPage({ initialTimeLogs }: { initialTimeLogs: any[] }) {
  const timeLogs = initialTimeLogs;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Time Tracking</h1>
          <p className="text-muted-foreground">
            Log hours against projects and tasks for accurate job costing and billing.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Log Time Entry</CardTitle>
        </CardHeader>
        <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="grid gap-2">
                    <Label>Project</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select project"/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="proj1">Website Redesign</SelectItem>
                            <SelectItem value="proj2">Marketing Campaign</SelectItem>
                            <SelectItem value="proj3">Hardware Prototype</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="task">Task</Label>
                    <Input id="task" placeholder="e.g., Development"/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="hours">Hours</Label>
                    <Input id="hours" type="number" placeholder="0.0"/>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date"/>
                </div>
                <Button className="w-full"><PlusCircle className="mr-2"/> Add Entry</Button>
            </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Recent Time Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.employee}</TableCell>
                  <TableCell>{log.project}</TableCell>
                  <TableCell>{log.task}</TableCell>
                  <TableCell>{log.hours}</TableCell>
                  <TableCell>{log.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
