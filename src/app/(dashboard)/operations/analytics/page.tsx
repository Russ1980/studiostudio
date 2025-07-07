
import { getOperationsAnalytics } from "@/lib/actions";
import { AnalyticsClientPage } from "./analytics-client";

export default async function AnalyticsPage() {
  const analyticsData = await getOperationsAnalytics();
  return <AnalyticsClientPage analyticsData={analyticsData} />;
}
