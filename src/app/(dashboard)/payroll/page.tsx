import { getPayrollDashboardData } from "@/lib/actions";
import { PayrollDashboardClientPage } from "./payroll-dashboard-client";

export default async function PayrollDashboardPage() {
    const data = await getPayrollDashboardData();
    return <PayrollDashboardClientPage initialData={data} />;
}
