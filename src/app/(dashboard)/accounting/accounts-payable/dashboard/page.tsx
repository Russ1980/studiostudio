
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Users, Receipt, CreditCard, FilePlus } from "lucide-react";


export default function APDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts Payable</h1>
          <p className="text-muted-foreground">
            Manage all money your company owes.
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><CreditCard />Pay Bills</Button>
            <Button><FilePlus />Enter Bill</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/accounting/accounts-payable/vendors">
          <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                  <div className="flex items-center gap-4">
                      <div className="bg-secondary p-3 rounded-lg">
                          <Users className="h-6 w-6 text-secondary-foreground" />
                      </div>
                      <CardTitle>Manage Vendors</CardTitle>
                  </div>
              </CardHeader>
              <CardContent>
                  <CardDescription>View, add, and manage all vendor profiles and payment terms.</CardDescription>
              </CardContent>
          </Card>
        </Link>
        <Link href="/accounting/accounts-payable/bills">
          <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                   <div className="flex items-center gap-4">
                      <div className="bg-secondary p-3 rounded-lg">
                          <Receipt className="h-6 w-6 text-secondary-foreground" />
                      </div>
                      <CardTitle>Manage Bills</CardTitle>
                  </div>
              </CardHeader>
              <CardContent>
                  <CardDescription>Enter new bills, track due dates, and manage payments to vendors.</CardDescription>
              </CardContent>
          </Card>
        </Link>
      </div>

    </div>
  );
}
