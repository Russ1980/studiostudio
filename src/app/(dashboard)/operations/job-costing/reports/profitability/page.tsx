import { getJobProfitabilityData } from "@/lib/actions";
import { ProfitabilityClientPage } from "./profitability-client";

export default async function JobProfitabilityPage() {
    const profitabilityData = await getJobProfitabilityData();
    return <ProfitabilityClientPage profitabilityData={profitabilityData} />;
}
