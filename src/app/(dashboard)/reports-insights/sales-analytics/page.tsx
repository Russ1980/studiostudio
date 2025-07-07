
import { getSalesAnalyticsData } from "@/lib/actions";
import { SalesAnalyticsClient } from "./sales-analytics-client";


export default async function SalesAnalyticsPage() {
    const data = await getSalesAnalyticsData();

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Sales Analytics</h1>
                <p className="text-muted-foreground">
                    Provide detailed analytics specifically on sales performance.
                </p>
            </div>
            <SalesAnalyticsClient data={data} />
        </div>
    )
}
