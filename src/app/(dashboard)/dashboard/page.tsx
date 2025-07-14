
import { getAccountingDashboardData } from "@/lib/actions";
import { DashboardClientPage } from "./dashboard-client";
import { mockDashboardPageData } from "@/lib/data";

export default async function DashboardPage() {
    let initialData;

    try {
        initialData = await getAccountingDashboardData();
    } catch (error) {
        console.error("Failed to fetch live dashboard data, falling back to mock data:", error);
        initialData = mockDashboardPageData; // Fallback to mock data on error
    }

    // Ensure initialData is never null or undefined when passed to the client component
    const finalData = initialData || mockDashboardPageData;

    return <DashboardClientPage initialData={finalData} />;
}
