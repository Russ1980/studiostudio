
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, CreditCard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBankAccounts } from "@/lib/actions";

export default async function BankAccountsPage() {
  const accounts = await getBankAccounts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bank Accounts</h1>
          <p className="text-muted-foreground">
            A summary of all your connected bank and credit card accounts.
          </p>
        </div>
        <Button variant="outline"><RefreshCw className="mr-2"/>Refresh All</Button>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
              {account.type === 'bank' ? <Banknote className="h-4 w-4 text-muted-foreground" /> : <CreditCard className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${account.balance}</div>
              <p className="text-xs text-muted-foreground">{account.bank} (•••• {account.lastFour})</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
