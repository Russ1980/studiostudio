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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown, Download, PlusCircle } from "lucide-react";

const clients = [
  { id: "1", businessName: "Innovate Inc.", contact: "John Doe", status: "Active", tier: "Professional", onboarded: "2023-01-15" },
  { id: "2", businessName: "Apex Solutions", contact: "Jane Smith", status: "Onboarding", tier: "Enterprise", onboarded: "2023-03-01" },
  { id: "3", businessName: "QuantumLeap Co.", contact: "Peter Jones", status: "Active", tier: "Standard", onboarded: "2022-11-20" },
  { id: "4", businessName: "Stellar Goods", contact: "Mary Johnson", status: "Inactive", tier: "Standard", onboarded: "2022-09-10" },
  { id: "5", businessName: "Momentum LLC", contact: "David Brown", status: "Active", tier: "Professional", onboarded: "2023-05-22" },
  { id: "6", businessName: "Visionary Ventures", contact: "Sarah Wilson", status: "Active", tier: "Enterprise", onboarded: "2021-12-30" },
];

type Client = typeof clients[number];

const statusVariant: { [key: string]: "success" | "default" | "secondary" } = {
  Active: "success",
  Onboarding: "default",
  Inactive: "secondary",
};


export default function ClientListPage() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  
  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedRows(new Set(clients.map(c => c.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(id);
    } else {
      newSelectedRows.delete(id);
    }
    setSelectedRows(newSelectedRows);
  };

  return (
    <div className="grid gap-6">
       <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-muted-foreground">
            View, manage, and onboard your clients from one central place.
          </p>
        </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
             <Input placeholder="Filter by business name..." className="max-w-sm" />
             <div className="flex items-center gap-2">
                <Button variant="outline"><Download className="mr-2" /> Import</Button>
                <Button asChild><Link href="/accountant-portal/add-new-client"><PlusCircle className="mr-2" />Add New Client</Link></Button>
             </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                   <Checkbox 
                     checked={selectedRows.size > 0 && (selectedRows.size === clients.length ? true : "indeterminate")}
                     onCheckedChange={handleSelectAll}
                   />
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="p-0 hover:bg-transparent">
                    Business Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Primary Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription Tier</TableHead>
                <TableHead>Onboarded</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} data-state={selectedRows.has(client.id) ? "selected" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(client.id)}
                      onCheckedChange={(checked) => handleSelectRow(client.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{client.businessName}</TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[client.status]}>{client.status}</Badge>
                  </TableCell>
                  <TableCell>{client.tier}</TableCell>
                  <TableCell>{client.onboarded}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Client Details</DropdownMenuItem>
                        <DropdownMenuItem>Manage Subscription</DropdownMenuItem>
                        <DropdownMenuItem>Go to Client Portal</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">Deactivate Client</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                {selectedRows.size} of {clients.length} row(s) selected.
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
