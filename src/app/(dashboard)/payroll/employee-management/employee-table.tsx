
"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
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
import { MoreHorizontal, ArrowUpDown, Upload, FilePlus, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

const statusVariant: { [key: string]: "success" | "default" | "secondary" | "destructive" } = {
  Active: "success",
  "On Leave": "default",
  Terminated: "destructive",
};

export function EmployeeTable({ employees }: { employees: any[] }) {
  const router = useRouter();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
           <Input placeholder="Filter by employee name..." className="max-w-sm" />
           <div className="flex items-center gap-2">
              <Button variant="outline"><Upload className="mr-2" /> Import Employees</Button>
              <Button asChild><Link href="/payroll/employee-management/new"><FilePlus className="mr-2" />Add Employee</Link></Button>
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
                  <Badge variant={statusVariant[employee.status as keyof typeof statusVariant]}>{employee.status}</Badge>
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
                      <DropdownMenuItem onSelect={() => router.push(`/payroll/employee-management/edit/${employee.id}`)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Employee
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
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
  );
}
