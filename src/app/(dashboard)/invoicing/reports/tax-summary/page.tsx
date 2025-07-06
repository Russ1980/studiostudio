
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileBarChart2 } from "lucide-react";

export default function TaxSummaryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Sales Tax Summary</h1>
        <p className="text-muted-foreground">
          Summarizes taxable sales and collected sales tax for easier filing.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <FileBarChart2 className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Sales Tax Summary Report</CardTitle>
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
