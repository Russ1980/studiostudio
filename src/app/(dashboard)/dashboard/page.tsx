
import { getAccountingDashboardData } from "@/lib/actions";
import { DashboardClientPage } from "./dashboard-client";

export default async function DashboardPage() {
    let initialData;

    try {
        initialData = await getAccountingDashboardData();
    } catch (error) {
        console.error("Failed to fetch live dashboard data, falling back to mock data:", error);
        initialData = null; // Set to null or a default state on error
    }

    return <DashboardClientPage initialData={initialData} />;
}
