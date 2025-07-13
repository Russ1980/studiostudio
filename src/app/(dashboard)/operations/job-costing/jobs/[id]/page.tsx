
import { getJobDetails } from "@/lib/actions";
import { JobDetailsClientPage } from "./job-details-client";
import { notFound } from "next/navigation";

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobDetails(id);

  if (!job) {
    notFound();
  }

  return <JobDetailsClientPage job={job} />;
}
