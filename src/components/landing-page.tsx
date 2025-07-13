
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  BookOpen,
  Receipt,
  Wrench,
  Briefcase,
  Calculator,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { Logo } from "@/components/icons";

const modules = [
  {
    title: "Core Accounting",
    description: "General ledger, chart of accounts, journal entries, and financial statements.",
    icon: BookOpen,
  },
  {
    title: "Invoicing & A/R",
    description: "Create, send, and track invoices. Manage customers and accounts receivable.",
    icon: Receipt,
  },
  {
    title: "Operations",
    description: "Inventory management, production planning, job costing, and logistics.",
    icon: Wrench,
  },
  {
    title: "Accountant Portal",
    description: "A centralized hub for accounting firms to manage all their clients.",
    icon: Briefcase,
  },
  {
    title: "Intelligent Tax",
    description: "Tax planning, filing management, and compliance tools powered by AI.",
    icon: Calculator,
  },
  {
    title: "Investments",
    description: "Track your portfolio, research assets, and paper trade with real-time data.",
    icon: TrendingUp,
  },
];

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 flex items-center container mx-auto px-4 md:px-6">
        <Link href="/" className="flex items-center justify-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold text-lg text-gray-900">Mardisen Suite</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 ml-10 text-sm font-medium text-gray-600">
            <Link href="/solutions" className="hover:text-gray-900">Solutions <ChevronDown className="inline-block h-4 w-4"/></Link>
            <Link href="/product" className="hover:text-gray-900">Product <ChevronDown className="inline-block h-4 w-4"/></Link>
            <Link href="/for-accountants" className="hover:text-gray-900">For Accountants</Link>
            <Link href="/pricing" className="hover:text-gray-900">Pricing</Link>
            <Link href="/contact" className="hover:text-gray-900">Contact</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" asChild>
            <Link href="/signin">
            Log In
            </Link>
        </Button>
        <Button asChild>
            <Link href="/pricing">Get Started Free</Link>
        </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 md:py-32 lg:py-40 text-center">
            <div className="container px-4 md:px-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                    The Financial Intelligence Platform for Modern Business
                </h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg md:text-xl">
                    Integrate your accounting, invoicing, operations, and tax into a single, AI-powered system. Get the insights you need to grow faster.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/pricing">Get Started</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                         <Link href="/product">Explore Product</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-24 bg-muted/40">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Meet Serva, Your AI Assistant</h2>
                        <p className="mt-4 text-muted-foreground">
                            Our state-of-the-art AI, Serva, is integrated into every part of the Mardisen Suite. It automates tedious tasks, surfaces critical insights, and provides expert-level analysis on demand.
                        </p>
                        <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircleIcon className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <h4 className="font-semibold">Automated Bookkeeping</h4>
                                    <p className="text-sm text-muted-foreground">Serva categorizes transactions, reconciles accounts, and flags anomalies automatically.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircleIcon className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <h4 className="font-semibold">On-Demand Reporting</h4>
                                    <p className="text-sm text-muted-foreground">Ask for any financial report or analysis in plain English and get instant results.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-3">
                                <CheckCircleIcon className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <h4 className="font-semibold">Proactive Insights</h4>
                                    <p className="text-sm text-muted-foreground">Serva monitors your data 24/7 to identify trends, forecast cash flow, and alert you to potential issues.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Serva AI Assistant" className="rounded-lg shadow-xl" data-ai-hint="futuristic dashboard" />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-24">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold">One Platform, Every Financial Tool</h2>
                    <p className="text-muted-foreground mt-4">
                        Stop juggling multiple apps. Mardisen Suite brings all your financial operations under one roof.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {modules.map((module) => (
                    <Card key={module.title}>
                        <CardHeader className="flex flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <module.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{module.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-muted-foreground">{module.description}</p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto py-8 px-4 md:px-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Mardisen Suite, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
