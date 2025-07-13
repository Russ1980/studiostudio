
import { getClientById, getClients } from "@/lib/actions";
import { notFound } from "next/navigation";
import { EditClientForm } from "./edit-client-form";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  
  // This check ensures that the client object is not null and has the necessary properties before proceeding.
  if (!client || !client.businessName) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Client</h1>
          <p className="text-muted-foreground">
            Update the profile for {client.businessName}.
          </p>
        </div>
      </div>
      <EditClientForm client={client} />
    </div>
  );
}
