
import { getDashboardPageData } from "@/lib/actions";
import { DashboardClientPage } from "./dashboard-client";

export default async function DashboardPage() {
    const data = await getDashboardPageData();
    return <DashboardClientPage initialData={data} />;
}
