
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Banknote, CreditCard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const accounts = [
    { name: "Business Checking", bank: "Chase Bank", lastFour: "1234", balance: "1,250,320.50", type: "bank" },
    { name: "Business Credit Card", bank: "American Express", lastFour: "5678", balance: "12,500.00", type: "credit" },
    { name: "Savings Account", bank: "Chase Bank", lastFour: "4321", balance: "500,000.00", type: "bank" },
];

export default function BankAccountsPage() {
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
