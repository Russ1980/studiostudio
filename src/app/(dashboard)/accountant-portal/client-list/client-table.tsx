
"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { MoreHorizontal, ArrowUpDown, Download, PlusCircle, Pencil, Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deactivateClient } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";


const statusVariant: { [key: string]: "success" | "default" | "secondary" } = {
  Active: "success",
  Onboarding: "default",
  Inactive: "secondary",
};

export function ClientListTable({ clients }: { clients: any[] }) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [clientToDeactivate, setClientToDeactivate] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  
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
  
  const openDeactivationDialog = (client: any) => {
    setClientToDeactivate(client);
    setIsAlertOpen(true);
  };

  const handleDeactivation = () => {
    if (!clientToDeactivate) return;
    
    startTransition(async () => {
      const result = await deactivateClient(clientToDeactivate.id);
      if (result.success) {
        toast({ title: "Client Deactivated", description: `${clientToDeactivate.businessName} has been marked as inactive.` });
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
      setIsAlertOpen(false);
      setClientToDeactivate(null);
    });
  };

  return (
    <>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark <span className="font-bold">{clientToDeactivate?.businessName}</span> as inactive. They will no longer appear in active client lists. This action can be reversed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeactivation} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                    <Badge variant={statusVariant[client.status as keyof typeof statusVariant]}>{client.status}</Badge>
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
                        <DropdownMenuItem onSelect={() => router.push(`/accountant-portal/edit-client/${client.id}`)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Client
                        </DropdownMenuItem>
                        <DropdownMenuItem>Manage Subscription</DropdownMenuItem>
                        <DropdownMenuItem>Go to Client Portal</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onSelect={() => openDeactivationDialog(client)}>
                            <Trash2 className="mr-2 h-4 w-4"/>
                            Deactivate Client
                        </DropdownMenuItem>
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
    </>
  );
}
