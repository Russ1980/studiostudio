
import { getChartOfAccounts } from "@/lib/actions";
import { ChartOfAccountsClientPage } from "./chart-of-accounts-client";

export default async function ChartOfAccountsPage() {
  const chartOfAccountsData = await getChartOfAccounts();
  return <ChartOfAccountsClientPage initialData={chartOfAccountsData} />;
}
