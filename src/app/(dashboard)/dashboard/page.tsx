
import { getDashboardPageData } from "@/lib/actions";
import { getRevenueDataTool } from "@/ai/tools/get-revenue-data";
import { DashboardClientPage } from "./dashboard-client";

export default async function DashboardPage() {
    const dashboardData = await getDashboardPageData();
    const revenueData = await getRevenueDataTool({});
    
    // Combine all data needed by the client component
    const initialData = {
        ...dashboardData,
        chartData: revenueData.data.map(d => ({ month: d.month, income: d.revenue, expenses: d.revenue * 0.6 })),
    };

    return <DashboardClientPage initialData={initialData} />;
}
