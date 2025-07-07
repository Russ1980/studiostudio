
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import {
  ChevronRight,
  Zap,
  CheckCircle,
  BarChart2,
  DollarSign,
  Users2,
  TrendingUp,
  CreditCard,
  MousePointerClick,
  MessageSquare,
  Camera,
  Menu,
  X,
  Star,
  LayoutDashboard,
  Wand2,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatePresence, motion } from 'framer-motion';

function FinancialCard() {
  return (
    <Card className="w-full max-w-xl rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl ring-1 ring-black/5">
      <CardHeader className="p-2 border-b">
        <div className="flex justify-around text-xs sm:text-sm text-gray-500 font-medium">
          <button className="flex items-center gap-2 p-2 transition-colors hover:text-primary">
            <BarChart2 className="h-4 w-4" />
            <span>Executive Overview</span>
          </button>
          <button className="flex items-center gap-2 p-2 text-primary border-b-2 border-primary font-semibold">
            <DollarSign className="h-4 w-4" />
            <span>Financial Health</span>
          </button>
          <button className="flex items-center gap-2 p-2 transition-colors hover:text-primary">
            <Zap className="h-4 w-4" />
            <span>Serva AI Insights</span>
          </button>
          <button className="flex items-center gap-2 p-2 transition-colors hover:text-primary">
            <Users2 className="h-4 w-4" />
            <span>Workflow Hub</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="font-semibold">Financial Health Score</p>
              <p className="text-sm text-gray-500">Overall financial stability assessment</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-600">87</p>
            <p className="text-sm text-gray-500">out of 100</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>Current Ratio</span>
              </div>
              <p className="text-3xl font-bold">2.4</p>
              <p className="text-sm text-gray-500">Liquidity measure</p>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Healthy</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <BarChart2 className="h-4 w-4 text-purple-500" />
                <span>Debt-to-Equity</span>
              </div>
              <p className="text-3xl font-bold">0.32</p>
              <p className="text-sm text-gray-500">Leverage ratio</p>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Conservative</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

function NextLogoIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M11.9999 19.5L12 4.5L5.67383 17.5H18.326L11.9999 4.5V19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    );
}

const features = [
    {
        icon: Wand2,
        title: "Serva AI Copilot",
        description: "Your intelligent assistant for financial analysis, report summarization, and proactive insights.",
    },
    {
        icon: LayoutDashboard,
        title: "Unified Dashboard",
        description: "A complete, real-time overview of your business or client's financial health in one place.",
    },
    {
        icon: Zap,
        title: "Workflow Automation",
        description: "Automate repetitive tasks like invoicing, reminders, and report generation to save time.",
    },
];

const testimonials = [
    {
        quote: "Mardisen Suite has transformed our firm. The AI-driven insights save us hours on each client, allowing us to provide more strategic value.",
        name: "Sarah Johnson",
        title: "Partner, Apex Accounting",
        avatar: "SJ",
    },
    {
        quote: "As a small business owner, Mardisen gives me the clarity I need to make informed financial decisions. The dashboard is a game-changer.",
        name: "Michael Chen",
        title: "Founder, Innovate Inc.",
        avatar: "MC",
    },
    {
        quote: "The multi-company billing and reporting is best-in-class. It's the perfect tool for managing our entire portfolio of businesses.",
        name: "Laura Rodriguez",
        title: "CFO, QuantumLeap Co.",
        avatar: "LR",
    },
];

export default function LandingPage() {

  return (
    <>
        <section className="relative bg-[#0B1535] text-white py-20 sm:py-24 lg:py-32 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/10"></div>
             <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-purple-600/30 to-blue-600/30 blur-3xl opacity-50"></div>
            </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20 py-1.5 px-3">
                  <Zap className="h-4 w-4 mr-2 text-purple-400" />
                  Powered by Serva AI
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
                  Financial Intelligence Meets <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">AI Power</span>
                </h1>
                <p className="max-w-xl text-lg text-gray-300">
                  Transform your accounting practice with Serva AI - the industry's first intelligent assistant that understands finance, automates workflows, and delivers insights in real-time.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <Button asChild size="lg">
                      <Link href="/signin">Request Demo</Link>
                    </Button>
                    <Button asChild variant="link" className="text-white">
                      <Link href="/pricing">View Pricing <ArrowRight className="h-4 w-4 ml-2" /></Link>
                    </Button>
                </div>
              </div>

              <div className="relative">
                <FinancialCard />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 sm:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">A Smarter Way to Work</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Mardisen Suite integrates cutting-edge technology to streamline every aspect of your financial operations.
                    </p>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/10 rounded-full w-fit">
                                    <feature.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="testimonials" className="py-20 sm:py-32 bg-secondary">
             <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Trusted by Industry Leaders</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        See what our customers are saying about Mardisen Suite.
                    </p>
                </div>
                 <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-background">
                            <CardContent className="p-6">
                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    </>
  );
}
