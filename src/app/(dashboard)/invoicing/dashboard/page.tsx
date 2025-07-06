import { getInvoicingDashboardData } from "@/lib/actions";
import { InvoicingDashboardClientPage } from "./invoicing-dashboard-client";

export default async function InvoicingDashboardPage() {
    const data = await getInvoicingDashboardData();
    return <InvoicingDashboardClientPage initialData={data} />;
}
