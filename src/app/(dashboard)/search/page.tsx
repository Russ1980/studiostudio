import { getStockData } from "@/lib/actions";
import { SearchClientPage } from "./search-client";

export default async function SearchPage() {
  const initialStockData = await getStockData();
  return <SearchClientPage initialStockData={initialStockData} />;
}
