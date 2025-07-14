
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function EditClientForm({ client }: { client: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Client: {client?.businessName}</CardTitle>
        <CardDescription>This component is under construction.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Form fields for editing the client will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
