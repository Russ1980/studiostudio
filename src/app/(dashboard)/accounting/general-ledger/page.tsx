import { getLedgerTransactions } from "@/lib/actions";
import { GeneralLedgerClientPage } from "./general-ledger-client";

export default async function GeneralLedgerPage() {
    const data = await getLedgerTransactions();
    return <GeneralLedgerClientPage initialData={data} />;
}
