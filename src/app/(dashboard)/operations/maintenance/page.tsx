
import { getMaintenanceData } from "@/lib/actions";
import { MaintenanceClientPage } from "./maintenance-client";

export default async function MaintenancePage() {
    const data = await getMaintenanceData();
    return <MaintenanceClientPage tasks={data.tasks} />;
}
