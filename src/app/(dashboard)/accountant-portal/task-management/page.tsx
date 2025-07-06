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
import { getTasks } from "@/lib/actions";

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

export default async function TaskManagementPage() {
  const tasks = await getTasks();

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
              <TaskTable tasks={tasks}/>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="team-tasks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskTable tasks={tasks} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


const TaskTable = ({ tasks }: { tasks: any[] }) => (
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
                <Badge variant={priorityVariant[task.priority as keyof typeof priorityVariant]}>{task.priority}</Badge>
            </TableCell>
            <TableCell>
                <Badge variant={statusVariant[task.status as keyof typeof statusVariant]}>{task.status}</Badge>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
)
