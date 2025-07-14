
import { getStockData } from "@/lib/actions";
import { SearchClientPage } from "./search-client";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SearchPage({
  searchParams,
}: PageProps) {
  const ticker = typeof searchParams?.ticker === 'string' ? searchParams.ticker : 'AAPL';
  const stockData = await getStockData(ticker);
  return <SearchClientPage stockData={stockData} />;
}
