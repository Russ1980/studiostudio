"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Starter",
        monthlyPrice: 49,
        annualPrice: 14.70,
        description: "For individuals and small businesses just getting started.",
        features: {
            "Core Accounting": true,
            "Invoicing & A/R": true,
            "Basic Reporting": true,
            "Serva AI Assistant": false,
            "Payroll System": false,
            "Operations Module": false,
            "Intelligent Tax": false,
            "Accountant Portal": false,
        },
        userLimit: "Up to 2 users",
    },
    {
        name: "Professional",
        monthlyPrice: 99,
        annualPrice: 29.70,
        description: "For growing businesses that need more automation and insights.",
        features: {
            "Core Accounting": true,
            "Invoicing & A/R": true,
            "Basic Reporting": true,
            "Serva AI Assistant": true,
            "Payroll System": true,
            "Operations Module": false,
            "Intelligent Tax": false,
            "Accountant Portal": false,
        },
        userLimit: "Up to 10 users",
        popular: true,
    },
    {
        name: "Business",
        monthlyPrice: 149,
        annualPrice: 44.70,
        description: "For established businesses with complex operational needs.",
        features: {
            "Core Accounting": true,
            "Invoicing & A/R": true,
            "Basic Reporting": true,
            "Serva AI Assistant": true,
            "Payroll System": true,
            "Operations Module": true,
            "Intelligent Tax": false,
            "Accountant Portal": false,
        },
        userLimit: "Up to 25 users",
    },
    {
        name: "Suite",
        monthlyPrice: 199,
        annualPrice: 59.70,
        description: "The complete financial suite for enterprises and accounting firms.",
        features: {
            "Core Accounting": true,
            "Invoicing & A/R": true,
            "Basic Reporting": true,
            "Serva AI Assistant": true,
            "Payroll System": true,
            "Operations Module": true,
            "Intelligent Tax": true,
            "Accountant Portal": true,
        },
        userLimit: "Unlimited users",
    }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Find the Right Plan for Your Business</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Simple, transparent pricing. All plans come with a 14-day free trial.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn("font-medium text-sm", !isAnnual && "text-primary")}>Monthly (50% Off)</span>
            <Switch id="billing-cycle" checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle billing cycle" />
            <span className={cn("font-medium text-sm", isAnnual && "text-primary")}>Annually (70% Off)</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 items-start">
        {plans.map((plan) => (
            <Card key={plan.name} className={cn("flex flex-col", plan.popular && "border-primary ring-2 ring-primary")}>
                <CardHeader>
                    {plan.popular && <Badge className="w-fit mb-2">Most Popular</Badge>}
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="pt-4">
                        <span className="text-4xl font-bold">
                            ${isAnnual ? plan.annualPrice.toFixed(2) : (plan.monthlyPrice * 0.5).toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                        <p className="text-xs text-muted-foreground">{isAnnual ? "Billed annually" : "Billed monthly"}</p>
                    </div>
                </CardHeader>
                <CardContent className="flex-1">
                    <ul className="space-y-3">
                        {Object.entries(plan.features).map(([feature, included]) => (
                            <li key={feature} className="flex items-center gap-2">
                                {included ? <Check className="h-4 w-4 text-success"/> : <X className="h-4 w-4 text-muted-foreground"/>}
                                <span className={cn("text-sm", !included && "text-muted-foreground line-through")}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button className="w-full">Get Started</Button>
                    <p className="text-xs text-muted-foreground">{plan.userLimit}</p>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
