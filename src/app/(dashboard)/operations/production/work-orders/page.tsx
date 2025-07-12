
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { getWorkOrders } from "@/lib/actions";
import { useEffect, useState } from "react";

const priorityVariant: { [key: string]: "destructive" | "default" } = {
  High: "destructive",
  Medium: "default",
  Low: "default",
};

const statusVariant: { [key: string]: "default" | "success" } = {
  "In Progress": "default",
  "Pending": "default",
  "Completed": "success",
};

export default function WorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState<any[]>([]);

  useEffect(() => {
    getWorkOrders().then(setWorkOrders);
  }, []);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Work Orders</h1>
          <p className="text-muted-foreground">
            Create, schedule, and track individual production jobs.
          </p>
        </div>
        <Button><PlusCircle className="mr-2"/> Create Work Order</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Work Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Job Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell className="font-medium">{order.job}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status as keyof typeof statusVariant]}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant[order.priority as keyof typeof priorityVariant]}>{order.priority}</Badge>
                  </TableCell>
                  <TableCell>{order.due}</TableCell>
                  <TableCell>{order.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Print Work Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
