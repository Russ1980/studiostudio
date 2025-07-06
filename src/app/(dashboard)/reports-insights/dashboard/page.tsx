
import { generateDashboardInsights } from "@/ai/flows/generate-dashboard-insights";
import { DashboardClientPage } from "./dashboard-client";

// Mock data to be passed to the AI flow
const mockFinancialData = {
    revenueData: [
      { month: "Jan", revenue: 680000 },
      { month: "Feb", revenue: 720000 },
      { month: "Mar", revenue: 810000 },
      // Anomaly introduced for demonstration
      { month: "Apr", revenue: 450000 }, 
      { month: "May", revenue: 850000 },
      { month: "Jun", revenue: 920000 },
    ],
    expenseData: [
        { category: "Salaries", amount: 450000 },
        { category: "Marketing", amount: 120000 },
        { category: "COGS", amount: 600000 },
        { category: "R&D", amount: 210000 },
        { category: "Overhead", amount: 85000 },
    ],
};

const fallbackInsights = [
    { type: "Anomaly Detection", summary: "A significant revenue dip was detected in April, which is inconsistent with the overall growth trend. This warrants further investigation." },
    { type: "Trend Analysis", summary: "Excluding the anomaly in April, your revenue shows a consistent upward trend over the past six months, indicating strong growth." },
    { type: "Key Highlight", summary: "Cost of Goods Sold (COGS) and Salaries are your two largest expense categories, representing a significant portion of your total operating costs." },
];

export default async function ReportsDashboardPage() {
    let insightsData;
    try {
        insightsData = await generateDashboardInsights(mockFinancialData);
    } catch (error) {
        console.error("Failed to generate AI insights:", error);
        insightsData = { insights: fallbackInsights };
    }

    return <DashboardClientPage insights={insightsData?.insights || fallbackInsights} />;
}
