
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function EditEmployeeForm({ employee }: { employee: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Employee: {employee?.name}</CardTitle>
        <CardDescription>This component is under construction.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Form fields for editing the employee will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
