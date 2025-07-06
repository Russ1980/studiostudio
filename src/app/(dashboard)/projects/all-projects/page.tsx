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
import { getJobs } from "@/lib/actions";

const statusVariant: { [key: string]: "success" | "default" | "secondary" } = {
  "In Progress": "default",
  "On Hold": "secondary",
  "Completed": "success",
};

export default async function AllProjectsPage() {
  const projects = await getJobs();

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
                  <TableCell>{project.customer}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[project.status as keyof typeof statusVariant]}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                      <span className="text-xs text-muted-foreground">
                        ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={project.profitability >= 0 ? 'text-success' : 'text-destructive'}>
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
