
import { getPurchaseOrders } from "@/lib/actions";
import { PurchaseOrdersClientPage } from "./purchase-orders-client";

export default async function PurchaseOrdersPage() {
  const purchaseOrders = await getPurchaseOrders();

  return <PurchaseOrdersClientPage purchaseOrders={purchaseOrders} />;
}
