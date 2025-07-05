
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown, Upload, FilePlus } from "lucide-react";

const employees = [
    { id: "1", name: "Liam Johnson", email: "liam.j@innovate.com", department: "Engineering", role: "Software Engineer", status: "Active", hireDate: "2022-08-15" },
    { id: "2", name: "Olivia Smith", email: "olivia.s@innovate.com", department: "Marketing", role: "Marketing Manager", status: "Active", hireDate: "2021-03-01" },
    { id: "3", name: "Noah Williams", email: "noah.w@innovate.com", department: "Sales", role: "Account Executive", status: "On Leave", hireDate: "2023-01-10" },
    { id: "4", name: "Emma Brown", email: "emma.b@innovate.com", department: "Product", role: "Product Manager", status: "Active", hireDate: "2022-05-20" },
    { id: "5", name: "James Jones", email: "james.j@innovate.com", department: "Engineering", role: "QA Engineer", status: "Terminated", hireDate: "2021-11-30" },
];

type Employee = typeof employees[number];

const statusVariant: { [key: string]: "success" | "default" | "secondary" | "destructive" } = {
  Active: "success",
  "On Leave": "default",
  Terminated: "destructive",
};

export default function EmployeeManagementPage() {
  return (
    <div className="grid gap-6">
       <div>
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground">
            A central directory for managing all employee profiles, compensation, and personal information.
          </p>
        </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
             <Input placeholder="Filter by employee name..." className="max-w-sm" />
             <div className="flex items-center gap-2">
                <Button variant="outline"><Upload className="mr-2" /> Import Employees</Button>
                <Button asChild><Link href="#"><FilePlus className="mr-2" />Add Employee</Link></Button>
             </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Employee Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[employee.status]}>{employee.status}</Badge>
                  </TableCell>
                  <TableCell>{employee.hireDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Compensation</DropdownMenuItem>
                        <DropdownMenuItem>Manage Benefits</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">Offboard Employee</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-end">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
