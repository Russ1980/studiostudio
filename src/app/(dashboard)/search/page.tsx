
import { getStockData } from "@/lib/actions";
import { SearchClientPage } from "./search-client";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const ticker = typeof searchParams?.ticker === 'string' ? searchParams.ticker : 'AAPL';
  const stockData = await getStockData(ticker);
  return <SearchClientPage stockData={stockData} />;
}
