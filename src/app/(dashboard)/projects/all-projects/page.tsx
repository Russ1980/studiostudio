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
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const projects = [
  { id: "PROJ-001", name: "Website Redesign", client: "Innovate Inc.", status: "In Progress", budget: 25000, spent: 18000, profitability: 7000 },
  { id: "PROJ-002", name: "Q3 Marketing Campaign", client: "Apex Solutions", status: "On Hold", budget: 50000, spent: 20000, profitability: 30000 },
  { id: "PROJ-003", name: "Mobile App Development", client: "QuantumLeap Co.", status: "Completed", budget: 120000, spent: 115000, profitability: 5000 },
  { id: "PROJ-004", name: "Hardware Prototyping", client: "Stellar Goods", status: "In Progress", budget: 75000, spent: 78000, profitability: -3000 },
];

const statusVariant: { [key: string]: "success" | "default" | "secondary" } = {
  "In Progress": "default",
  "On Hold": "secondary",
  "Completed": "success",
};

export default function AllProjectsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Projects</h1>
          <p className="text-muted-foreground">
            A comprehensive list of all projects, their status, and financial health.
          </p>
        </div>
        <Button asChild>
          <Link href="#"><PlusCircle className="mr-2"/> Create Project</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget vs. Actual</TableHead>
                <TableHead>Profitability</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                      <span className="text-xs text-muted-foreground">
                        ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={project.profitability > 0 ? 'text-success' : 'text-destructive'}>
                    ${project.profitability.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Dashboard</DropdownMenuItem>
                        <DropdownMenuItem>Log Time</DropdownMenuItem>
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
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
