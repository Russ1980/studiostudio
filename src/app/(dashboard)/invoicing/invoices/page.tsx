
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getInvoices } from "@/lib/actions";
import { InvoiceTable } from "./invoice-table";

export default async function InvoiceManagementPage() {
  const invoices = await getInvoices();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoice Management</h1>
          <p className="text-muted-foreground">
            A central place for managing the entire lifecycle of an invoice.
          </p>
        </div>
        <Button asChild>
          <Link href="/invoicing/new"><PlusCircle className="mr-2"/> Create Invoice</Link>
        </Button>
      </div>
      <InvoiceTable invoices={invoices} />
    </div>
  );
}
