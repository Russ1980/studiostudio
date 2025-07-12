
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { MoreHorizontal, PlusCircle, Trash2, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getProductionPlans } from "@/lib/actions";
import { useEffect, useState } from "react";

const statusVariant: { [key: string]: "default" | "success" } = {
  "In Progress": "default",
  "Pending": "default",
  "Completed": "success",
};

export default function ProductionPlansPage() {
  const [productionPlans, setProductionPlans] = useState<any[]>([]);

  useEffect(() => {
    getProductionPlans().then(setProductionPlans);
  }, []);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Production Planning</h1>
          <p className="text-muted-foreground">
            Create, manage, and track production plans to balance demand with resources.
          </p>
        </div>
        <Button asChild>
          <Link href="/operations/production/plans/new"><PlusCircle className="mr-2"/> Create Plan</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Production Plans</CardTitle>
             <Input placeholder="Filter by product name..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-mono">{plan.id}</TableCell>
                  <TableCell className="font-medium">{plan.product}</TableCell>
                  <TableCell>{plan.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[plan.status as keyof typeof statusVariant]}>{plan.status}</Badge>
                  </TableCell>
                  <TableCell>{plan.due}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem><Pencil className="mr-2"/>Edit Plan</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2"/>Cancel Plan</DropdownMenuItem>
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
