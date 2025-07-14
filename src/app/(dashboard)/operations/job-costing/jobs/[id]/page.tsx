
import { getJobDetails } from "@/lib/actions";
import { JobDetailsClientPage } from "@/app/(dashboard)/operations/job-costing/jobs/[id]/job-details-client";
import { notFound } from "next/navigation";

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const job = await getJobDetails(id);

  if (!job) {
    notFound();
  }

  return <JobDetailsClientPage job={job} />;
}
