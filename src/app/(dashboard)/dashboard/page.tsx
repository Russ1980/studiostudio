
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockDashboardPageData } from "@/lib/data";
import { OnboardingController } from "@/components/onboarding/onboarding-controller";
import { DevTools } from "@/components/development/dev-tools";
import {
  DollarSign,
  TrendingUp,
  RefreshCw,
  Download,
  Share2,
  Settings,
  Receipt,
  BarChart3,
  Bell,
  Users,
  Eye,
  Briefcase,
  SlidersHorizontal,
  Wand2,
  BarChart,
  TrendingDown,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const dashboardData = mockDashboardPageData;

  const { user, mainKpis, navItems, metricCards } = dashboardData;

  const getMetricIcon = (iconName: string) => {
    switch(iconName) {
      case 'TrendingUp': return TrendingUp;
      case 'DollarSign': return DollarSign;
      case 'BarChart3': return BarChart3;
      case 'Receipt': return Receipt;
      default: return DollarSign;
    }
  }

  const getNavIcon = (iconName: string) => {
    switch(iconName) {
        case 'BarChart': return BarChart;
        case 'DollarSign': return DollarSign;
        case 'Wand2': return Wand2;
        case 'Users': return Users;
        case 'Eye': return Eye;
        case 'Briefcase': return Briefcase;
        case 'SlidersHorizontal': return SlidersHorizontal;
        default: return BarChart;
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <OnboardingController userRole={user.role.toLowerCase()} />
      <DevTools />

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold">{mainKpis.netRevenue}</p>
                <p className="text-sm text-muted-foreground">Net Revenue</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold text-success">{mainKpis.growth}</p>
                <p className="text-sm text-muted-foreground">Growth</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold text-primary">{mainKpis.healthScore}</p>
                <p className="text-sm text-muted-foreground">Health Score</p>
              </div>
              <Separator orientation="vertical" className="h-10 hidden sm:block" />
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon"><RefreshCw className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <div className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive border-2 border-background" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {navItems.map((item, index) => {
              const NavIcon = getNavIcon(item.icon);
              return (
                <button
                  key={item.title}
                  className={cn(
                    "flex flex-col items-start gap-1 p-4 text-left transition-colors hover:bg-muted/50",
                    item.active && "bg-primary/5",
                    index < 6 && "border-r"
                  )}
                >
                  <NavIcon className={cn("h-5 w-5", item.active ? "text-primary" : "text-muted-foreground")} />
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card) => {
           const Icon = getMetricIcon(card.icon);
           return (
            <Card key={card.title}>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-muted rounded-md">
                            <Icon className="h-4 w-4 text-muted-foreground"/>
                        </div>
                        <CardTitle className="text-base font-medium">{card.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{card.value}</p>
                    {card.details ? (
                         <p className="text-xs text-muted-foreground whitespace-pre-line">{card.details}</p>
                    ) : (
                        <p className={cn("text-xs text-muted-foreground", card.changeType === 'increase' ? 'text-success' : 'text-destructive')}>
                           vs last month {card.change}
                        </p>
                    )}
                </CardContent>
            </Card>
           )
        })}
      </div>
    </div>
  );
}
