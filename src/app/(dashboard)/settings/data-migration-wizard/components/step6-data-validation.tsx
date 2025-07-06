
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileCheck, FileWarning, FileX } from "lucide-react";

export function Step6DataValidation() {
  return (
    <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Data Validation</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
            We've scanned your files for issues. Here's a summary.
        </p>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
            <Card className="border-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileCheck className="text-green-500"/> Valid Records</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">10,450</p>
                    <p className="text-sm text-muted-foreground">Ready for import.</p>
                </CardContent>
            </Card>
            <Card className="border-yellow-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileWarning className="text-yellow-500"/> Warnings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">35</p>
                    <p className="text-sm text-muted-foreground">e.g., Missing optional fields.</p>
                </CardContent>
            </Card>
            <Card className="border-red-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileX className="text-red-500"/> Errors</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">e.g., Invalid date formats.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
