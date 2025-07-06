import { getJobDetails } from "@/lib/actions";
import { JobDetailsClientPage } from "./job-details-client";
import { notFound } from "next/navigation";

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJobDetails(params.id);

  if (!job) {
    notFound();
  }

  return <JobDetailsClientPage job={job} />;
}
