
import { getStockData } from "@/lib/actions";
import { SearchClientPage } from "./search-client";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = (await searchParams) || {};
  const ticker = typeof search?.ticker === 'string' ? search.ticker : 'AAPL';
  const stockData = await getStockData(ticker);
  return <SearchClientPage stockData={stockData} />;
}
