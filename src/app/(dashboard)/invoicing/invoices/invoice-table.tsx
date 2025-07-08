"use client";

import { useState } from "react";
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
import { MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { getInvoices as getInvoicesType, getClients as getClientsType } from "@/lib/actions";

type Invoice = Awaited<ReturnType<typeof getInvoicesType>>[0];
type Client = Awaited<ReturnType<typeof getClientsType>>[0];

const statusVariant: { [key: string]: "success" | "destructive" | "default" } = {
  Paid: "success",
  Overdue: "destructive",
  Sent: "default",
  Draft: "default",
};

export function InvoiceTable({ invoices, clients }: { invoices: Invoice[], clients: Client[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [clientFilter, setClientFilter] = useState("all");

    const filteredInvoices = invoices.filter(invoice => 
        (invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) || invoice.invoice.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "all" || invoice.status === statusFilter) &&
        (clientFilter === "all" || invoice.customer === clientFilter)
    );

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <CardTitle>All Invoices</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search by customer/ID..." 
                                className="pl-9 w-48"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                             />
                        </div>
                         <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Sent">Sent</SelectItem>
                                <SelectItem value="Overdue">Overdue</SelectItem>
                                <SelectItem value="Draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select value={clientFilter} onValueChange={setClientFilter}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="All Clients" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Clients</SelectItem>
                                {clients.map(client => (
                                    <SelectItem key={client.id} value={client.businessName}>{client.businessName}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice #</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-16 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredInvoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-mono">{invoice.invoice}</TableCell>
                                <TableCell className="font-medium">{invoice.customer}</TableCell>
                                <TableCell>${invoice.amount}</TableCell>
                                <TableCell>{invoice.dueDate}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[invoice.status as keyof typeof statusVariant] || 'default'}>{invoice.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                            <DropdownMenuItem>Record Payment</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
