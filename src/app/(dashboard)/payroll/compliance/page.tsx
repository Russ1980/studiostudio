
import { getComplianceItems } from "@/lib/actions";
import { ComplianceClientPage } from "./compliance-client";

export default async function CompliancePage() {
  const complianceItems = await getComplianceItems();
  return <ComplianceClientPage complianceItems={complianceItems} />;
}
