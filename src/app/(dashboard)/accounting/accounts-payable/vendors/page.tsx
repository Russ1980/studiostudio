
"use client";

import {
  Card,
  CardContent,
  CardHeader,
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

const vendors = [
    { name: "Office Supplies Inc.", email: "sales@officesupplies.com", balance: "1,200.00" },
    { name: "Cloud Services LLC", email: "billing@cloudservices.com", balance: "5,000.00" },
    { name: "Marketing Agency Co.", email: "accounts@marketing.co", balance: "10,500.00" },
];


export default function VendorsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Vendors</h1>
                <p className="text-muted-foreground">A directory of all vendors and their outstanding balances.</p>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <Input placeholder="Filter vendors..." className="max-w-sm"/>
                        <Button><PlusCircle />Add Vendor</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Outstanding Balance</TableHead>
                                <TableHead className="w-16 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendors.map((vendor, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{vendor.name}</TableCell>
                                    <TableCell>{vendor.email}</TableCell>
                                    <TableCell>${vendor.balance}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Enter Bill</DropdownMenuItem>
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
