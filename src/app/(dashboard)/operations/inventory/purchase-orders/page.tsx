
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
import { getPurchaseOrders } from "@/lib/actions";
import { useEffect, useState } from "react";
import Link from "next/link";

type PurchaseOrder = {
  poNumber: string;
  vendor: string;
  status: string;
  total: number;
  orderDate: string;
  expectedDelivery: string;
};

const statusVariant: { [key: string]: "success" | "default" | "secondary" | "destructive" } = {
  Fulfilled: "success",
  Sent: "default",
  Draft: "secondary",
  "Partially Received": "default",
  Closed: "success"
};

export default function PurchaseOrdersPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPurchaseOrders();
      setPurchaseOrders(data);
    }
    fetchData();
  }, []);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Purchase Orders</h1>
          <p className="text-muted-foreground">
            Create and track orders for new inventory from vendors.
          </p>
        </div>
        <Button asChild>
          <Link href="/operations/inventory/purchase-orders/new">
            <PlusCircle className="mr-2"/> Create Purchase Order
          </Link>
        </Button>
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
                  <TableCell>${po.total.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
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
