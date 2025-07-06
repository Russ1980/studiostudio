
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function JobCostingReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Job Costing Reports</h1>
        <p className="text-muted-foreground">
          Analyze job performance, profitability, and cost details.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <BarChart3 className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Job Costing Reports</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This feature is coming soon. Detailed reports on job profitability, budget vs. actuals, and WIP will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
