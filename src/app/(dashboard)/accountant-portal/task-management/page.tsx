"use client";

import React from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";

const tasks = [
  { task: "Q2 Tax Filing", client: "Innovate Inc.", due: "2024-07-31", priority: "High", status: "In Progress" },
  { task: "Monthly Bookkeeping", client: "Apex Solutions", due: "2024-07-25", priority: "Medium", status: "In Progress" },
  { task: "Review Financials", client: "QuantumLeap Co.", due: "2024-07-28", priority: "Medium", status: "Done" },
  { task: "Onboard New Client", client: "Momentum LLC", due: "2024-08-05", priority: "High", status: "Not Started" },
  { task: "Follow up on Invoice #1024", client: "Stellar Goods", due: "2024-07-22", priority: "Low", status: "Done" },
];

const priorityVariant: { [key: string]: "destructive" | "default" | "secondary" } = {
  High: "destructive",
  Medium: "default",
  Low: "secondary",
};

const statusVariant: { [key: string]: "default" | "success" | "secondary" } = {
    "In Progress": "default",
    "Done": "success",
    "Not Started": "secondary",
};

export default function TaskManagementPage() {
  return (
    <div className="grid gap-6">
       <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Task Management</h1>
            <p className="text-muted-foreground">
              Organize, assign, and track all your firm's work.
            </p>
          </div>
          <Button><PlusCircle className="mr-2"/> Create New Task</Button>
        </div>

      <Tabs defaultValue="my-tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="team-tasks">Team Tasks</TabsTrigger>
          <TabsTrigger value="task-templates" disabled>Task Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="my-tasks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskTable />
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="team-tasks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


const TaskTable = () => (
    <Table>
        <TableHeader>
        <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {tasks.map((task, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium">{task.task}</TableCell>
            <TableCell>{task.client}</TableCell>
            <TableCell>{task.due}</TableCell>
            <TableCell>
                <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
            </TableCell>
            <TableCell>
                <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
)
