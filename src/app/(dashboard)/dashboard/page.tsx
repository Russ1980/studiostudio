import { DashboardClientPage } from "./dashboard-client";
import { mockDashboardPageData } from "@/lib/data";

export default async function DashboardPage() {
    // The main layout now handles auth and loading states.
    // We can directly use mock data here for a stable and fast-loading dashboard experience.
    const initialData = mockDashboardPageData;

    return <DashboardClientPage initialData={initialData} />;
}
