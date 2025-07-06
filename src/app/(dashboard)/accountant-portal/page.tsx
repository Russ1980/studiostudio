import { getAccountantDashboardData } from "@/lib/actions";
import { AccountantPortalClientPage } from "./page-client";

export default async function AccountantPortalPage() {
  const data = await getAccountantDashboardData();
  
  return <AccountantPortalClientPage initialData={data} />;
}
