"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  BarChart,
  DollarSign,
  Wand2,
  Workflow,
  Eye,
  Building2,
  Settings,
  RefreshCw,
  Download,
  Share2,
  Bell,
  TrendingUp,
  CreditCard,
} from "lucide-react";

const navItems = [
  {
    icon: BarChart,
    title: "Executive Overview",
    description: "Comprehensive business summary",
    active: true,
  },
  {
    icon: DollarSign,
    title: "Financial Health",
    description: "Financial metrics and analysis",
  },
  {
    icon: Wand2,
    title: "Serva AI Insights",
    description: "AI-powered business intelligence",
  },
  {
    icon: Workflow,
    title: "Workflow Hub",
    description: "Team productivity and tasks",
  },
  {
    icon: Eye,
    title: "Process Visibility",
    description: "Operations monitoring",
  },
  {
    icon: Building2,
    title: "Business Context",
    description: "Industry benchmarks and insights",
  },
  {
    icon: Settings,
    title: "Customize Dashboard",
    description: "Personalize your workspace",
  },
];

const kpiData = [
  {
    title: "Monthly Expenses",
    value: "$0",
    change: "vs last month 0.0%",
    icon: TrendingUp,
    iconColor: "text-destructive",
  },
  {
    title: "Net Profit",
    value: "$0",
    change: "Income: $0",
    icon: DollarSign,
    iconColor: "text-success",
  },
  {
    title: "Sales (30 Days)",
    value: "$0",
    change: "+8.4%",
    icon: BarChart,
    iconColor: "text-primary",
  },
  {
    title: "A/R Total",
    value: "$0",
    change: "Overdue: $0",
    icon: CreditCard,
    iconColor: "text-primary",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  <Users />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">Sarah Johnson</h2>
                <p className="text-muted-foreground">Financial Controller</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold">$2.1M</p>
                <p className="text-sm text-muted-foreground">Net Revenue</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold text-success">+12.4%</p>
                <p className="text-sm text-muted-foreground">Growth</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold text-primary">94%</p>
                <p className="text-sm text-muted-foreground">Health Score</p>
              </div>
              <Separator orientation="vertical" className="h-10 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1">
                <Button variant="ghost" size="icon"><RefreshCw className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-2 w-2 justify-center p-0" variant="destructive" />
                </Button>
                <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-2">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                {navItems.map((item) => (
                    <div key={item.title} className={`flex flex-col items-center justify-center text-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                        <item.icon className={`h-6 w-6 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div>
                            <p className="font-semibold text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
                         <p className="text-2xl font-bold">{kpi.value}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{kpi.change}</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
