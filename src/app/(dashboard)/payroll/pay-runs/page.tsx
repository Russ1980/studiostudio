import { getPayRuns } from "@/lib/actions";
import { PayRunsClientPage } from "./pay-runs-client";

export default async function PayRunsPage() {
  const payRuns = await getPayRuns();
  return <PayRunsClientPage payRuns={payRuns} />;
}
