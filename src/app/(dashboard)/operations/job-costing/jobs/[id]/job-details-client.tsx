
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function JobDetailsClientPage({ job }: { job: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details: {job?.name}</CardTitle>
        <CardDescription>This component is under construction.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Details and cost breakdown for the job will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
