import { getPortfolioOverviewData } from "@/lib/actions";
import { PortfolioOverviewClientPage } from "./portfolio-overview-client";

export default async function PortfolioOverviewPage() {
  const data = await getPortfolioOverviewData();
  return <PortfolioOverviewClientPage data={data} />;
}
