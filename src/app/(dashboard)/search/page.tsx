
import { getStockData } from "@/lib/actions";
import { SearchClientPage } from "./search-client";


export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const params = await searchParams;
  const ticker = typeof params?.ticker === 'string' ? params.ticker : 'AAPL';
  const stockData = await getStockData(ticker);
  return <SearchClientPage stockData={stockData} />;
}
