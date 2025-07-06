import { getClients } from "@/lib/actions";
import { ClientListTable } from "./client-table";

export default async function ClientListPage() {
  const clients = await getClients();

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Client Management</h1>
        <p className="text-muted-foreground">
          View, manage, and onboard your clients from one central place.
        </p>
      </div>
      <ClientListTable clients={clients} />
    </div>
  );
}
