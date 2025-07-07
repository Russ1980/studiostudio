"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import { getComplianceItems } from "@/lib/actions";
import { useState, useEffect } from "react";


const statusVariant: { [key: string]: "success" | "default" } = {
  Compliant: "success",
  "Needs Review": "default",
};

export default function CompliancePage() {
  const [complianceItems, setComplianceItems] = useState<any[]>([]);

  useEffect(() => {
    getComplianceItems().then(setComplianceItems);
  }, []);

  return (
    <div className="grid gap-6">
       <div>
          <h1 className="text-3xl font-bold">Compliance Center</h1>
          <p className="text-muted-foreground">
            Monitor and ensure compliance with payroll and labor regulations.
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Review the status of key compliance items and take action where needed.</CardDescription>
            </CardHeader>
            <CardContent>
                 <TooltipProvider>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Compliance Item</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Checked</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {complianceItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                                    <span>{item.item}</span>
                                     <Tooltip>
                                        <TooltipTrigger asChild>
                                            <CircleHelp className="h-4 w-4 text-muted-foreground cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.description}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[item.status as keyof typeof statusVariant]}>{item.status}</Badge>
                                </TableCell>
                                <TableCell>{item.lastChecked}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">View Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TooltipProvider>
            </CardContent>
        </Card>
    </div>
  );
}
