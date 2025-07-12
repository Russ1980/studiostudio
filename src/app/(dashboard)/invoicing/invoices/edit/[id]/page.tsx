import { getInvoiceById, getClients } from "@/lib/actions";
import { notFound } from "next/navigation";
import { EditInvoiceForm } from "./edit-invoice-form";

export default async function EditInvoicePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const invoice = await getInvoiceById(id);
  const clients = await getClients();
  
  if (!invoice) {
    notFound();
  }

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
