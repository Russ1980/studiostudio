
import { getProjectsDashboardData } from "@/lib/actions";
import { ProjectsDashboardClientPage } from "./projects-dashboard-client";

export default async function ProjectsDashboardPage() {
  const data = await getProjectsDashboardData();
  return <ProjectsDashboardClientPage initialData={data} />;
}
