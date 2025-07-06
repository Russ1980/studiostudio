
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ReopenPeriodPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Reopen Accounting Period</h1>
        <p className="text-muted-foreground">
          Reopen a previously closed accounting period to make adjustments.
        </p>
      </div>
      <Card className="max-w-xl mx-auto w-full">
        <CardHeader>
            <CardTitle>Reopen Period</CardTitle>
            <CardDescription>This action should only be taken to correct critical errors.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="period-select">Period to Reopen</Label>
                <Select>
                    <SelectTrigger id="period-select">
                        <SelectValue placeholder="Select a closed period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2024-05">May 2024</SelectItem>
                        <SelectItem value="2024-04">April 2024</SelectItem>
                        <SelectItem value="2024-03">March 2024</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="reason">Reason for Reopening</Label>
                <Input id="reason" placeholder="e.g., To correct miscategorized expense" />
            </div>
             <div className="flex items-start p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5 mr-3 mt-1 shrink-0" />
                <div>
                    <h4 className="font-semibold">Warning</h4>
                    <p className="text-sm">Reopening a period can affect financial reports and requires a detailed audit trail. This action is logged and requires admin approval.</p>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full">
                <RefreshCw className="mr-2"/> Submit Request to Reopen Period
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
