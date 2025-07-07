
import { getLogisticsData } from "@/lib/actions";
import { LogisticsClientPage } from "./logistics-client";

export default async function LogisticsPage() {
    const data = await getLogisticsData();
    return <LogisticsClientPage shipments={data.shipments} />;
}
