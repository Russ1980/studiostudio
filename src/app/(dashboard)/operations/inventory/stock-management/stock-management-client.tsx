
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
import { MoreHorizontal, PlusCircle, Pencil, Upload, DollarSign, Package, AlertCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const kpiIconMap: { [key: string]: React.ElementType } = {
  DollarSign,
  Package,
  AlertCircle,
};

const statusVariant: { [key: string]: "success" | "default" | "destructive" } = {
  "In Stock": "success",
  "Low Stock": "default",
  "Out of Stock": "destructive",
};

export function StockManagementClientPage({ inventoryData }: { inventoryData: any }) {
  if (!inventoryData) {
    return <div>Loading...</div>; // or a skeleton component
  }
  
  const { kpiData, inventory } = inventoryData;

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stock Management</h1>
          <p className="text-muted-foreground">
            A real-time view of all inventory items and their levels.
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map((kpi: any) => {
          const Icon = kpiIconMap[kpi.icon];
          return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        )})}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inventory List</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline"><Upload className="mr-2"/> Import</Button>
            <Button variant="outline" asChild><Link href="/operations/inventory/adjust-stock"><Pencil className="mr-2"/> Adjust Stock</Link></Button>
            <Button><PlusCircle className="mr-2"/> Add New Item</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Unit Cost</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reorder Point</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item: any) => (
                <TableRow key={item.sku}>
                  <TableCell className="font-mono">{item.sku}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>${item.cost.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.reorderPoint}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[item.status as keyof typeof statusVariant]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Item</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>Create Purchase Order</DropdownMenuItem>
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
