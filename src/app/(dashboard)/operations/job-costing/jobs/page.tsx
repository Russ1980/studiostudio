
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

export default async function AllJobsPage() {
  const jobs = await getJobs();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Jobs</h1>
          <p className="text-muted-foreground">
            A comprehensive list of all jobs, their status, and financial health.
          </p>
        </div>
        <Button asChild>
          <Link href="/operations/job-costing/jobs/new"><PlusCircle className="mr-2"/> Create Job</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Name</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget vs. Actual</TableHead>
                <TableHead>Profitability</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>{job.customer}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[job.status as keyof typeof statusVariant]}>{job.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Progress value={(job.spent / job.budget) * 100} className="h-2" />
                      <span className="text-xs text-muted-foreground">
                        ${job.spent.toLocaleString()} / ${job.budget.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={job.profitability >= 0 ? 'text-success' : 'text-destructive'}>
                    ${job.profitability.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Enter Costs</DropdownMenuItem>
                        <DropdownMenuItem>Edit Job</DropdownMenuItem>
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
