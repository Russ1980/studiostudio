
import { getTimeAndAttendanceData } from "@/lib/actions";
import { TimeAttendanceClientPage } from "./time-attendance-client";

export default async function TimeAttendancePage() {
  const data = await getTimeAndAttendanceData();
  return <TimeAttendanceClientPage initialData={data} />;
}
