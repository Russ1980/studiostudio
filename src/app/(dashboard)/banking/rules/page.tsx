
import { getTransactionRules } from "@/lib/actions";
import { RulesClientPage } from "./rules-client";

export default async function TransactionRulesPage() {
  const rules = await getTransactionRules();
  return <RulesClientPage rules={rules} />;
}
