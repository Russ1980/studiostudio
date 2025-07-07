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
import { getBenefitsAdminData } from "@/lib/actions";
import { useState, useEffect } from "react";

const iconMap: { [key: string]: React.ElementType } = {
    Users,
    DollarSign,
    Building,
};

export default function BenefitsAdministrationPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getBenefitsAdminData().then(setData);
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Or a skeleton loader
  }
  
  const { kpiData, benefitPlans } = data;

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
        {kpiData.map((kpi: any) => {
          const Icon = iconMap[kpi.icon];
          return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        )})}
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Benefit Plans</CardTitle>
            <CardDescription>A list of all active employee benefit plans.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {benefitPlans.map((plan: any, index: number) => (
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
