
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customers = [
    { name: "Innovate Inc.", email: "contact@innovate.com", phone: "(555) 123-4567", balance: "50,000.00" },
    { name: "Apex Solutions", email: "accounts@apex.com", phone: "(555) 987-6543", balance: "75,000.00" },
    { name: "QuantumLeap Co.", email: "billing@quantumleap.co", phone: "(555) 555-1212", balance: "15,200.00" },
];


export default function CustomersPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Customers</h1>
                <p className="text-muted-foreground">A directory of all customers and their balances.</p>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <Input placeholder="Filter customers..." className="max-w-sm"/>
                        <Button><PlusCircle />Add Customer</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Current Balance</TableHead>
                                <TableHead className="w-16 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>${customer.balance}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Create Invoice</DropdownMenuItem>
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
    )
}

