
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, LineChart, TrendingUp, Zap, FileText, Banknote, Users, BarChart2, Briefcase, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
    {
        icon: Zap,
        title: "Automated Bookkeeping",
        description: "Serva AI handles journal entries and reconciles accounts, saving you hours of manual work."
    },
    {
        icon: FileText,
        title: "Intelligent Invoicing",
        description: "Create, send, and track professional invoices with automated reminders and payment processing."
    },
    {
        icon: Briefcase,
        title: "All-in-One Operations",
        description: "Manage everything from payroll and tax compliance to job costing and inventory in one place."
    },
    {
        icon: TrendingUp,
        title: "Proactive Insights",
        description: "Go beyond reports. Get actionable insights and financial forecasts to make smarter decisions."
    }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <div className="bg-primary text-primary-foreground text-center p-2 text-sm">
        Save 70% off annually on Mardisen Suite for your first year! Limited time only.
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="#" className="flex items-center gap-2 mr-6">
            <Logo className="h-6 w-6" />
            <span className="font-bold">Mardisen Suite</span>
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            <Link href="#" className="transition-colors hover:text-foreground">Solutions</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Product</Link>
            <Link href="#" className="transition-colors hover:text-foreground">For Accountants</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Pricing</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2">
            <Button variant="ghost" asChild>
                <Link href="/auth/signin">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/auth/signin">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative bg-slate-900 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 opacity-20"></div>
          <div className="container relative grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
            <div className="grid gap-6">
              <Badge variant="outline" className="w-fit bg-white/10 text-white border-white/20">Powered by Serva AI</Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Financial Intelligence Meets <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">AI Power</span>
              </h1>
              <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed">
                Transform your accounting practice with Serva AI - the industry's first intelligent assistant that understands finance, automates workflows, and delivers insights in real-time.
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400"/>
                      <span>Automated Journal Entries</span>
                  </div>
                   <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400"/>
                      <span>Intelligent Reconciliation</span>
                  </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <Card className="shadow-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                         <Button variant="ghost" size="sm" className="bg-muted hover:bg-muted">Executive Overview</Button>
                         <Button variant="ghost" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">Financial Health</Button>
                         <Button variant="ghost" size="sm">Serva AI Insights</Button>
                     </div>
                     <Zap className="h-4 w-4 text-muted-foreground"/>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Card className="bg-green-500/10 border-green-500/20">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                           <CardTitle className="text-base font-medium">Financial Health Score</CardTitle>
                           <span className="text-2xl font-bold text-green-600">87</span>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-green-700">Overall financial stability assessment is healthy.</p>
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardDescription>Current Ratio</CardDescription>
                                <CardTitle className="flex items-baseline gap-2">2.4 <span className="text-sm font-medium text-success flex items-center gap-1"><TrendingUp className="h-4 w-4"/>Healthy</span></CardTitle>
                            </CardHeader>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardDescription>Debt-to-Equity</CardDescription>
                                <CardTitle className="flex items-baseline gap-2">0.32 <span className="text-sm font-medium text-success flex items-center gap-1"><TrendingUp className="h-4 w-4"/>Conservative</span></CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container py-20 md:py-28 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">One Platform, Infinite Efficiency</h2>
            <p className="max-w-3xl mx-auto mt-4 text-muted-foreground md:text-xl/relaxed">Stop juggling apps. Mardisen Suite brings all your financial operations into one intelligent command center.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                         <Card key={feature.title} className="hover:border-primary/50 hover:shadow-lg transition-all">
                            <CardHeader>
                                <div className="p-3 rounded-lg bg-primary/10 w-fit">
                                    <Icon className="h-6 w-6 text-primary"/>
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
          <div className="container py-8 flex items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2024 Mardisen Suite Inc. All rights reserved.</p>
            <div className="flex gap-4">
                <Link href="#" className="hover:text-foreground">Terms</Link>
                <Link href="#" className="hover:text-foreground">Privacy</Link>
            </div>
          </div>
      </footer>
    </div>
  );
}

