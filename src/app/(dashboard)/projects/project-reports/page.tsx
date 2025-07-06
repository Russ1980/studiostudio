import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ProjectReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Project Reports</h1>
        <p className="text-muted-foreground">
          Analyze project performance, profitability, and resource allocation.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <BarChart3 className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Project Reporting Center</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This feature is coming soon. Detailed project reports will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
