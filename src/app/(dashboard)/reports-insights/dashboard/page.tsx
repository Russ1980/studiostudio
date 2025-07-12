
import { generateDashboardInsights } from "@/ai/flows/generate-dashboard-insights";
import { getRevenueDataTool } from "@/ai/tools/get-revenue-data";
import { InsightsDashboardClient } from "./insights-dashboard-client";

// Mock expense data for now, as we don't have live expense tracking yet.
const mockExpenseData = [
    { category: "Salaries", amount: 450000 },
    { category: "Marketing", amount: 120000 },
    { category: "COGS", amount: 600000 },
    { category: "R&D", amount: 210000 },
    { category: "Overhead", amount: 85000 },
    { category: "Other", amount: 335000 },
];

const fallbackInsights = [
    { type: "Anomaly Detection", summary: "A significant revenue dip was detected in April, which is inconsistent with the overall growth trend. This warrants further investigation." },
    { type: "Trend Analysis", summary: "Excluding the anomaly in April, your revenue shows a consistent upward trend over the past six months, indicating strong growth." },
    { type: "Key Highlight", summary: "Cost of Goods Sold (COGS) and Salaries are your two largest expense categories, representing a significant portion of your total operating costs." },
] as const;

export default async function ReportsDashboardPage() {
    let insightsData;
    let revenueData;

    try {
        // Fetch live revenue data from Firestore
        const revenueResult = await getRevenueDataTool({});
        const liveRevenueData = revenueResult.data;

        // If there's no revenue data, we can create an anomaly to demonstrate the feature.
        const finalRevenueData = liveRevenueData.length > 0 ? liveRevenueData : [
            { month: "Jan", revenue: 680000 },
            { month: "Feb", revenue: 720000 },
            { month: "Mar", revenue: 810000 },
            // Anomaly introduced for demonstration
            { month: "Apr", revenue: 450000 }, 
            { month: "May", revenue: 850000 },
            { month: "Jun", revenue: 920000 },
        ];

        revenueData = finalRevenueData;
        
        const aiInput = {
            revenueData: finalRevenueData,
            expenseData: mockExpenseData,
        };

        insightsData = await generateDashboardInsights(aiInput);
    } catch (error) {
        console.error("Failed to generate AI insights:", error);
        insightsData = { insights: [...fallbackInsights] };
        revenueData = [
            { month: "Jan", revenue: 680000 }, { month: "Feb", revenue: 720000 },
            { month: "Mar", revenue: 810000 }, { month: "Apr", revenue: 450000 },
            { month: "May", revenue: 850000 }, { month: "Jun", revenue: 920000 },
        ];
    }

    return (
        <InsightsDashboardClient
            insights={insightsData?.insights || [...fallbackInsights]} 
            revenueData={revenueData}
            expenseData={mockExpenseData}
        />
    );
}
