
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart } from "lucide-react";

export default function SalesAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Sales Analytics</h1>
        <p className="text-muted-foreground">
          Provide detailed analytics specifically on sales performance.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <LineChart className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Detailed Sales Analytics</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This feature is coming soon. Reports on sales by customer, product, region, and salesperson will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
