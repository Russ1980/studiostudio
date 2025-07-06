
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export default function ExpenseAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Expense Analytics</h1>
        <p className="text-muted-foreground">
          Provide detailed analytics on company spending.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <PieChart className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Detailed Expense Analytics</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This feature is coming soon. Reports on expenses by category, vendor, and employee will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
