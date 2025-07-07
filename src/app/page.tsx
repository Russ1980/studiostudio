
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, LineChart, TrendingUp, Zap, BarChart3, Users, CheckCircle2, ChevronDown, Briefcase, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
    {
        icon: Zap,
        title: "Automated Bookkeeping",
        description: "Serva AI handles journal entries and reconciles accounts, saving you hours of manual work."
    },
    {
        icon: LineChart,
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
        Save 70% off annually on Mardisen Suite for your first year! Limited time only. <button className="ml-2">x</button>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="#" className="flex items-center gap-2 mr-6">
            <Logo className="h-6 w-6 text-primary" />
            <div className="flex items-baseline">
                <span className="font-bold">Mardisen</span>
                <span className="font-normal">Suite</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            <Link href="#" className="transition-colors hover:text-foreground flex items-center gap-1">Solutions <ChevronDown className="h-4 w-4" /></Link>
            <Link href="#" className="transition-colors hover:text-foreground flex items-center gap-1">Product <ChevronDown className="h-4 w-4" /></Link>
            <Link href="#" className="transition-colors hover:text-foreground">For Accountants</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Pricing</Link>
             <Link href="#" className="transition-colors hover:text-foreground">Contact</Link>
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
              <Badge variant="secondary" className="w-fit bg-white/10 text-white border-white/20">
                <Zap className="h-3 w-3 mr-2 text-fuchsia-400" />
                Powered by Serva Al
                <span className="ml-2 inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">LIVE</span>
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Financial Intelligence Meets <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">AI Power</span>
              </h1>
              <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed">
                Transform your accounting practice with Serva AI - the industry's first intelligent assistant that understands finance, automates workflows, and delivers insights in real-time.
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm text-slate-300">
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
              <Card className="shadow-2xl bg-slate-800/50 border-slate-700 text-white backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-1 p-1 bg-slate-700/50 rounded-lg">
                         <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700 hover:text-white text-xs gap-1"><BarChart3/>Executive Overview</Button>
                         <Button variant="ghost" size="sm" className="bg-slate-600 text-white hover:bg-slate-500 text-xs gap-1"><DollarSign/>Financial Health</Button>
                         <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700 hover:text-white text-xs gap-1"><Zap/>Serva AI Insights</Button>
                         <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700 hover:text-white text-xs gap-1"><Users/>Workflow Hub</Button>
                     </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Card className="bg-green-500/10 border-green-500/20 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                           <div>
                                <CardTitle className="text-base font-medium text-white flex items-center gap-2">
                                    <CheckCircle2 className="text-green-400" />
                                    Financial Health Score
                                </CardTitle>
                                <CardDescription className="text-green-200/80 text-xs">Overall financial stability assessment</CardDescription>
                           </div>
                           <div className="text-right">
                             <p className="text-3xl font-bold text-green-300">87</p>
                             <p className="text-xs text-green-200/80">out of 100</p>
                           </div>
                        </CardHeader>
                    </Card>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-slate-700/50 border-slate-600">
                            <CardHeader>
                                <CardDescription className="flex items-center gap-2 text-slate-300"><TrendingUp className="h-4 w-4" /> Current Ratio</CardDescription>
                                <CardTitle className="flex items-baseline gap-2">2.4</CardTitle>
                                <p className="text-xs text-muted-foreground">Liquidity measure</p>
                                <p className="text-xs text-green-400 font-semibold flex items-center gap-1"><Check className="h-3 w-3" /> Healthy</p>
                            </CardHeader>
                        </Card>
                         <Card className="bg-slate-700/50 border-slate-600">
                            <CardHeader>
                                <CardDescription className="flex items-center gap-2 text-slate-300"><BarChart3 className="h-4 w-4" /> Debt-to-Equity</CardDescription>
                                <CardTitle className="flex items-baseline gap-2">0.32</CardTitle>
                                <p className="text-xs text-muted-foreground">Leverage ratio</p>
                                <p className="text-xs text-green-400 font-semibold flex items-center gap-1"><Check className="h-3 w-3" /> Conservative</p>
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
