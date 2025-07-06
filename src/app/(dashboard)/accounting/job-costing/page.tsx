
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

export default function JobCostingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Job Costing</h1>
        <p className="text-muted-foreground">
          Track and allocate costs to specific projects, jobs, or contracts.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <CircleDollarSign className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Job Costing</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This feature is coming soon. Detailed job costing and profitability analysis will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
