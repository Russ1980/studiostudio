
import { getAccountingDashboardData } from "@/lib/actions";
import { getRevenueDataTool } from "@/ai/tools/get-revenue-data";
import { DashboardClientPage } from "./dashboard-client";
import { mockDashboardPageData } from "@/lib/data";

export default async function DashboardPage() {
    let initialData;

    try {
        // Fetch all necessary data directly on the server page component
        const dashboardData = await getAccountingDashboardData();
        const revenueData = await getRevenueDataTool({});
        
        // Combine all data needed by the client component into a single object
        initialData = {
            ...dashboardData,
            chartData: revenueData.data.map(d => ({ month: d.month, income: d.revenue, expenses: d.revenue * 0.6 })),
        };
    } catch (error) {
        console.error("Failed to fetch dashboard data, falling back to mock data:", error);
        // If any of the async operations fail, use the mock data as a fallback.
        initialData = {
            ...mockDashboardPageData,
            chartData: mockDashboardPageData.chartData.map(d => ({ month: d.month, income: d.income, expenses: d.expenses })),
        };
    }

    return <DashboardClientPage initialData={initialData} />;
}
