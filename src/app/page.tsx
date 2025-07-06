"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const features = [
    "AI-Powered Insights",
    "Intelligent Tax Planning",
    "Automated Workflows",
    "Enterprise-Grade Security"
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="#" className="flex items-center gap-2 mr-6">
            <Logo className="h-6 w-6" />
            <span className="font-bold">Mardisen Suite</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">Features</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Pricing</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Docs</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2">
            <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/auth/signin">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
          <div className="grid gap-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              The All-in-One Financial Operations Platform
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              From invoicing and payroll to AI-powered insights and tax planning, Mardisen Suite provides the tools you need to run your business with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild><Link href="/auth/signin">Get Started Free</Link></Button>
              <Button size="lg" variant="outline">Request a Demo</Button>
            </div>
          </div>
          <div>
            <Card>
                <CardHeader>
                    <CardTitle>Built for Modern Finance Teams</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="grid gap-3">
                        {features.map((feature, i) => (
                             <li key={i} className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-success" />
                                <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t">
          <div className="container py-6 flex items-center justify-between text-sm text-muted-foreground">
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
