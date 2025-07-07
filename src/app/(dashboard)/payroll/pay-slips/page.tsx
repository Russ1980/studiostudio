
import { getPaySlips } from "@/lib/actions";
import { PaySlipsClientPage } from "./pay-slips-client";

export default async function PaySlipsPage() {
    const paySlips = await getPaySlips();
    return <PaySlipsClientPage paySlips={paySlips} />;
}
