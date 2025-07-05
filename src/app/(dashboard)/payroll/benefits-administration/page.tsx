
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, DollarSign, Building } from "lucide-react";

const kpiData = [
  { title: "Total Enrollment", value: "88%", icon: Users },
  { title: "Monthly Cost", value: "$42,500", icon: DollarSign },
  { title: "Active Carriers", value: "4", icon: Building },
];

const benefitPlans = [
    { name: "Medical Plan", provider: "Aetna", participants: 68, status: "Active" },
    { name: "Dental Plan", provider: "Delta Dental", participants: 62, status: "Active" },
    { name: "Vision Plan", provider: "VSP", participants: 55, status: "Active" },
    { name: "401(k) Retirement Plan", provider: "Fidelity", participants: 58, status: "Active" },
];

export default function BenefitsAdministrationPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Benefits Administration</h1>
          <p className="text-muted-foreground">
            Manage employee benefit plans like health insurance and retirement.
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">Manage Plans</Button>
            <Button>Run Open Enrollment</Button>
        </div>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Benefit Plans</CardTitle>
            <CardDescription>A list of all active employee benefit plans.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {benefitPlans.map((plan, index) => (
                    <li key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                            <ShieldCheck className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">{plan.name}</p>
                            <p className="text-sm text-muted-foreground">Provider: {plan.provider}</p>
                        </div>
                         <div className="text-center">
                            <p className="font-medium">{plan.participants}</p>
                            <p className="text-sm text-muted-foreground">Participants</p>
                        </div>
                         <div className="text-center">
                            <p className="font-medium">{plan.status}</p>
                            <p className="text-sm text-muted-foreground">Status</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                    </li>
                ))}
            </ul>
        </CardContent>
       </Card>
    </div>
  );
}
