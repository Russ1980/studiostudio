import { getTradingData } from "@/lib/actions";
import { TradingClientPage } from "./trading-client";

export default async function TradingPage() {
  const data = await getTradingData();

  return <TradingClientPage data={data} />;
}
