
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function EditInvoiceForm({ invoice, clients }: { invoice: any, clients: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Invoice {invoice?.invoiceNumber}</CardTitle>
        <CardDescription>This component is under construction.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Form fields for editing the invoice will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
