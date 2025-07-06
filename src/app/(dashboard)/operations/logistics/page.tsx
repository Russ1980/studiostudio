"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck } from "lucide-react";

export default function LogisticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Logistics</h1>
        <p className="text-muted-foreground">
          Manage the movement of goods, including inbound raw materials and outbound finished products.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <Truck className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Logistics & Shipment Tracking</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This feature is coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
