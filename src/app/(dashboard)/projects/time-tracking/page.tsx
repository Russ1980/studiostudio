
import { getTimeLogs } from "@/lib/actions";
import { TimeTrackingClientPage } from "./time-tracking-client";

export default async function TimeTrackingPage() {
  const timeLogs = await getTimeLogs();
  return <TimeTrackingClientPage initialTimeLogs={timeLogs} />;
}
