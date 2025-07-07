
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Download,
  Share2,
  Settings,
  RefreshCw,
  BarChart3,
  DollarSign,
  Wand2,
  Activity,
  Building,
  SlidersHorizontal,
  TrendingUp,
  Receipt,
} from "lucide-react";
import { getMockUser } from "@/lib/auth";
import { OnboardingController } from "@/components/onboarding/onboarding-controller";
import { DevTools } from "@/components/development/dev-tools";
import { useEffect, useState } from "react";
import type { User } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";


const navItems = [
    {
        title: "Executive Overview",
        description: "Comprehensive business summary",
        icon: BarChart3,
        active: true,
    },
    {
        title: "Financial Health",
        description: "Financial metrics and analysis",
        icon: DollarSign,
    },
    {
        title: "Serva AI Insights",
        description: "AI-powered business intelligence",
        icon: Wand2,
    },
    {
        title: "Workflow Hub",
        description: "Team productivity and tasks",
        icon: Users,
    },
    {
        title: "Process Visibility",
        description: "Operations monitoring",
        icon: Activity,
    },
    {
        title: "Business Context",
        description: "Industry benchmarks and insights",
        icon: Building,
    },
    {
        title: "Customize Dashboard",
        description: "Personalize your workspace",
        icon: SlidersHorizontal,
    },
];

const kpiItems = [
    {
        title: "Monthly Expenses",
        value: "$0",
        change: "vs last month 0.0%",
        icon: TrendingUp,
        iconColor: "text-red-500"
    },
    {
        title: "Net Profit",
        value: "$0",
        change: "Income: $0",
        icon: DollarSign,
        iconColor: "text-green-500"
    },
    {
        title: "Sales (30 Days)",
        value: "$0",
        change: "+8.4%",
        changeColor: "text-success",
        icon: BarChart3,
        iconColor: "text-blue-500"
    },
    {
        title: "A/R Total",
        value: "$0",
        change: "Overdue: $0",
        icon: Receipt,
        iconColor: "text-purple-500"
    }
];


export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMockUser().then(setUser);
  }, []);

  if (!user) {
    return (
        <div className="flex flex-col gap-6">
            <Card><CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent></Card>
            <Card><CardContent className="p-2"><Skeleton className="h-24 w-full" /></CardContent></Card>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <OnboardingController userRole={user.role.toLowerCase()} />
      <DevTools />

      <Card data-onboarding="dashboard-kpis">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  <Users />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-right sm:text-left">
                <p className="text-lg font-bold">$2.1M</p>
                <p className="text-sm text-muted-foreground">Net Revenue</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-lg font-bold text-success">+12.4%</p>
                <p className="text-sm text-muted-foreground">Growth</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-lg font-bold text-primary">94%</p>
                <p className="text-sm text-muted-foreground">Health Score</p>
              </div>
              <Separator orientation="vertical" className="h-10 hidden sm:block" />
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon"><RefreshCw className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-2">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {navItems.map((item) => (
                    <Button key={item.title} variant="ghost" className={cn("flex flex-col items-start justify-start h-auto p-3 text-left space-y-1", item.active && "bg-muted border border-border")}>
                        <item.icon className="h-5 w-5 text-primary mb-1"/>
                        <span className="font-semibold text-sm">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                    </Button>
                ))}
            </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiItems.map((kpi) => (
            <Card key={kpi.title}>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                        {kpi.title}
                        <kpi.icon className={cn("h-4 w-4", kpi.iconColor)} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className={cn("text-xs text-muted-foreground", kpi.changeColor)}>{kpi.change}</p>
                </CardContent>
            </Card>
        ))}
      </div>

    </div>
  );
}
