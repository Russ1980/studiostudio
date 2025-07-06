

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, FileCheck2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDataValidationResults } from "@/lib/actions";

const severityVariant: { [key: string]: 'destructive' | 'default' } = {
  Error: 'destructive',
  Warning: 'default',
};

export default async function ValidationReportPage() {
    const issues = await getDataValidationResults();
    const errorCount = issues.filter(i => i.severity === 'Error').length;
    const warningCount = issues.filter(i => i.severity === 'Warning').length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Data Validation Report</h1>
        <p className="text-muted-foreground">
          Run system-wide data validation reports to ensure data integrity and accuracy.
        </p>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Validation Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-success"/>
                        <div>
                            <p className="text-2xl font-bold">Data Integrity: Good</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Errors</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-destructive">{errorCount}</p>
                    <p className="text-sm text-muted-foreground">Critical issues that must be fixed.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Warnings</CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-2xl font-bold text-yellow-500">{warningCount}</p>
                     <p className="text-sm text-muted-foreground">Potential issues to review.</p>
                </CardContent>
            </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Issues Found</CardTitle>
                    <CardDescription>A list of data inconsistencies found across the system.</CardDescription>
                </div>
                <Button><FileCheck2 className="mr-2"/> Re-run Validation</Button>
            </div>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {issues.map((issue) => (
                    <li key={issue.id} className="flex items-start gap-4 p-4 rounded-lg border">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary shrink-0">
                            <AlertTriangle className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                               <p className="font-medium">{issue.issue}</p>
                               <Badge variant={severityVariant[issue.severity]}>{issue.severity}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{issue.details}</p>
                        </div>
                        <Button variant="outline" size="sm">Go to Issue</Button>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
