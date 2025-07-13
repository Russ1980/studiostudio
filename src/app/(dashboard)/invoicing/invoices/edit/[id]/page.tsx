
import { getInvoiceById, getClients } from "@/lib/actions";
import { notFound } from "next/navigation";
import { EditInvoiceForm } from "@/app/(dashboard)/invoicing/invoices/edit/[id]/edit-invoice-form";

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await getInvoiceById(id);
  
  if (!invoice) {
    notFound();
  }

  const clients = await getClients();
  
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Invoice</h1>
          <p className="text-muted-foreground">
            Update invoice {invoice.invoiceNumber}.
          </p>
        </div>
      </div>
      <EditInvoiceForm invoice={invoice} clients={clients} />
    </div>
  );
}
