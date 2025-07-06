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
import { MoreHorizontal, PlusCircle } from "lucide-react";

const purchaseOrders = [
  { poNumber: "PO-00125", vendor: "Component Suppliers Inc.", status: "Fulfilled", total: 15200.00, orderDate: "2024-06-10", expectedDelivery: "2024-06-20" },
  { poNumber: "PO-00126", vendor: "Raw Materials Co.", status: "Sent", total: 8500.00, orderDate: "2024-06-25", expectedDelivery: "2024-07-05" },
  { poNumber: "PO-00127", vendor: "Packaging Solutions", status: "Draft", total: 2300.00, orderDate: "2024-07-01", expectedDelivery: "2024-07-10" },
];

const statusVariant: { [key: string]: "success" | "default" | "secondary" } = {
  Fulfilled: "success",
  Sent: "default",
  Draft: "secondary",
};

export default function PurchaseOrdersPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Purchase Orders</h1>
          <p className="text-muted-foreground">
            Create and track orders for new inventory from vendors.
          </p>
        </div>
        <Button><PlusCircle className="mr-2"/> Create Purchase Order</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow key={po.poNumber}>
                  <TableCell className="font-medium">{po.poNumber}</TableCell>
                  <TableCell>{po.vendor}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[po.status]}>{po.status}</Badge>
                  </TableCell>
                  <TableCell>${po.total.toFixed(2)}</TableCell>
                  <TableCell>{po.orderDate}</TableCell>
                  <TableCell>{po.expectedDelivery}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View PO</DropdownMenuItem>
                        <DropdownMenuItem>Receive Items</DropdownMenuItem>
                        <DropdownMenuItem>Convert to Bill</DropdownMenuItem>
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
