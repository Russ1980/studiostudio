import { getJobCostingDashboardData } from "@/lib/actions";
import { JobCostingDashboardClientPage } from "./job-costing-client";

export default async function JobCostingDashboardPage() {
  const data = await getJobCostingDashboardData();

  return <JobCostingDashboardClientPage data={data} />;
}
