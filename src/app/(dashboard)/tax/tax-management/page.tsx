
import { getTaxFilings, getTaxPayments } from "@/lib/actions";
import { TaxManagementClientPage } from "./tax-management-client";

export default async function TaxManagementPage() {
  const taxFilings = await getTaxFilings();
  const taxPayments = await getTaxPayments();
  
  return <TaxManagementClientPage taxFilings={taxFilings} taxPayments={taxPayments} />;
}
