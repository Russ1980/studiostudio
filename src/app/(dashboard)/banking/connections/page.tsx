import { getBankConnections } from "@/lib/actions";
import { BankConnectionsClientPage } from "./bank-connections-client";

export default async function BankConnectionsPage() {
  const data = await getBankConnections();
  return <BankConnectionsClientPage initialData={data} />;
}
