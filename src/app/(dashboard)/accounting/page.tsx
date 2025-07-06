import { getAccountingDashboardData } from "@/lib/actions";
import { AccountingDashboardClientPage } from "./accounting-dashboard-client";

export default async function AccountingDashboardPage() {
    const data = await getAccountingDashboardData();
    return <AccountingDashboardClientPage initialData={data} />;
}
