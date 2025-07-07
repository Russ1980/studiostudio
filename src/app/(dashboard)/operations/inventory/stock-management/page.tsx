
import { getInventoryData } from "@/lib/actions";
import { StockManagementClientPage } from "./stock-management-client";

export default async function StockManagementPage() {
  const inventoryData = await getInventoryData();
  return <StockManagementClientPage inventoryData={inventoryData} />;
}
