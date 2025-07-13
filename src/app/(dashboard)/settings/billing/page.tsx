
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
    { name: "Starter", price: "$49", features: ["Core Accounting", "Invoicing", "Basic Reporting"], current: false },
    { name: "Professional", price: "$99", features: ["All Starter features", "Payroll System", "Advanced Reporting"], current: true },
    { name: "Enterprise", price: "Custom", features: ["All Professional features", "Operations Module", "Dedicated Support"], current: false },
];

export default function BillingPage() {
  return (
    <div className="grid gap-6">
        <div>
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            <p className="text-muted-foreground">Manage your subscription plan, view payment history, and update your payment method.</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.current ? 'border-primary' : ''}>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.current && <Badge>Current Plan</Badge>}
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/ month</span>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {plan.features.map(feature => (
                        <li key={feature} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-success"/>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full" variant={plan.current ? "outline" : "default"} asChild>
                    <Link href="/pricing">
                        {plan.current ? "Manage Plan" : "Upgrade"}
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Update your billing information.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Visa ending in 1234</p>
                <p className="text-sm text-muted-foreground">Expires 12/2026</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline">Update Payment Method</Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download all past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Your next bill for $99 is on August 1, 2024.</p>
            </CardContent>
             <CardFooter>
                <Button variant="outline">View Billing History</Button>
             </CardFooter>
        </Card>
      </div>
    </div>
  );
}
