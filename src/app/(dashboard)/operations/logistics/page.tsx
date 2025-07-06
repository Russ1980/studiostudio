
"use client";

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
import { Truck, Package, CheckCircle, AlertTriangle, Route } from "lucide-react";
import Image from "next/image";
import { getLogisticsData } from "@/lib/actions";
import { useState, useEffect } from "react";

const statusVariant: { [key: string]: "success" | "destructive" | "default" } = {
  "Delivered": "success",
  "Delayed": "destructive",
  "In Transit": "default",
  "Out for Delivery": "default",
};

export default function LogisticsPage() {
    const [shipments, setShipments] = useState<any[]>([]);

    useEffect(() => {
        getLogisticsData().then(data => setShipments(data.shipments));
    }, []);

    const kpiData = [
        { title: "Shipments In-Transit", value: shipments.filter(s => s.status === "In Transit").length, icon: Truck },
        { title: "Delivered (Last 7 Days)", value: shipments.filter(s => s.status === "Delivered").length, icon: CheckCircle },
        { title: "Delayed Shipments", value: shipments.filter(s => s.status === "Delayed").length, icon: AlertTriangle },
    ];

  return (
    <div className="flex flex-col gap-6">
       <div>
        <h1 className="text-3xl font-bold">Logistics & Supply Chain</h1>
        <p className="text-muted-foreground">
          Manage the movement of goods, including inbound raw materials and outbound finished products.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Shipment Tracking</CardTitle>
            <CardDescription>A real-time overview of all current shipments.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Tracking #</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Origin</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Est. Delivery</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shipments.map((shipment) => (
                        <TableRow key={shipment.id}>
                            <TableCell className="font-medium">{shipment.orderId}</TableCell>
                            <TableCell>{shipment.carrier}</TableCell>
                            <TableCell>{shipment.tracking}</TableCell>
                            <TableCell><Badge variant={statusVariant[shipment.status]}>{shipment.status}</Badge></TableCell>
                            <TableCell>{shipment.origin}</TableCell>
                            <TableCell>{shipment.destination}</TableCell>
                            <TableCell>{shipment.estDelivery}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
