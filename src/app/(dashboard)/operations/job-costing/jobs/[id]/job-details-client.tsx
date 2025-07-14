"use client";
// This is a placeholder component to fix the build.
export function JobDetailsClientPage({ job }: { job: any }) {
  return (
    <div>
        <h1 className="text-3xl font-bold">{job.name}</h1>
        <p>Details for this job will be implemented here.</p>
    </div>
  );
}
