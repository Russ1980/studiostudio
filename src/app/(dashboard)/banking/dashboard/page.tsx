
import { getBankDashboardData } from "@/lib/actions";
import { BankingDashboardClientPage } from "./banking-dashboard-client";

export default async function BankingDashboardPage() {
    const data = await getBankDashboardData();
    return <BankingDashboardClientPage initialData={data} />;
}
