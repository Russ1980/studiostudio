
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Landmark, RefreshCw, Trash2, Search } from "lucide-react";
import Image from "next/image";

const connectedAccounts = [
    { name: "Business Checking", bank: "Chase", logo: "https://placehold.co/40x40.png", hint: "bank logo", status: "Connected" },
    { name: "Business Credit Card", bank: "American Express", logo: "https://placehold.co/40x40.png", hint: "bank logo", status: "Connected" },
    { name: "Savings Account", bank: "Chase", logo: "https://placehold.co/40x40.png", hint: "bank logo", status: "Error" },
];

const popularBanks = [
    { name: "Chase", logo: "https://placehold.co/40x40.png", hint: "bank logo" },
    { name: "Bank of America", logo: "https://placehold.co/40x40.png", hint: "bank logo" },
    { name: "Wells Fargo", logo: "https://placehold.co/40x40.png", hint: "bank logo" },
    { name: "Stripe", logo: "https://placehold.co/40x40.png", hint: "payment processor logo" },
    { name: "PayPal", logo: "https://placehold.co/40x40.png", hint: "payment processor logo" },
];

export default function BankConnectionsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Bank Connections</h1>
        <p className="text-muted-foreground">
          Manage secure connections to your banks and financial institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {connectedAccounts.map((account, index) => (
                        <li key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                            <Image src={account.logo} alt={`${account.bank} logo`} width={40} height={40} data-ai-hint={account.hint} />
                            <div className="flex-1">
                                <p className="font-medium">{account.name}</p>
                                <p className="text-sm text-muted-foreground">{account.bank}</p>
                            </div>
                            <Badge variant={account.status === 'Connected' ? 'success' : 'destructive'}>{account.status}</Badge>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon"><RefreshCw className="h-4 w-4"/></Button>
                                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Connect a New Account</CardTitle>
                <CardDescription>Find your bank to securely link your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for your bank..." className="pl-9" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Popular Institutions</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {popularBanks.map((bank, index) => (
                            <Button key={index} variant="outline" className="h-auto py-4 flex flex-col gap-2">
                                <Image src={bank.logo} alt={`${bank.name} logo`} width={32} height={32} data-ai-hint={bank.hint} />
                                <span className="text-xs">{bank.name}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
