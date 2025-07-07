
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Wand2, BarChart3, DollarSign, Users, CheckCircle, BarChart, ArrowUp, Zap, Bot, BrainCircuit, Star } from 'lucide-react';

function HeroCard() {
  return (
    <Card className="w-full max-w-lg bg-background/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <Tabs defaultValue="health">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview"><BarChart3 className="mr-2" /> Executive Overview</TabsTrigger>
            <TabsTrigger value="health"><DollarSign className="mr-2" /> Financial Health</TabsTrigger>
            <TabsTrigger value="ai"><Wand2 className="mr-2" /> Serva AI Insights</TabsTrigger>
            <TabsTrigger value="workflow"><Users className="mr-2" /> Workflow Hub</TabsTrigger>
          </TabsList>
          <TabsContent value="health" className="mt-4">
            <Card className="bg-secondary/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  Financial Health Score
                </CardTitle>
                <CardDescription>Overall financial stability assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">87 <span className="text-lg text-muted-foreground">out of 100</span></p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"/>Current Ratio</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">2.4</p>
                      <p className="text-xs text-muted-foreground">Liquidity measure</p>
                      <Badge variant="success" className="mt-1 bg-green-500/10 text-green-400 border-none">Healthy</Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"/>Debt-to-Equity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">0.32</p>
                      <p className="text-xs text-muted-foreground">Leverage ratio</p>
                       <Badge variant="default" className="mt-1 bg-blue-500/10 text-blue-400 border-none">Conservative</Badge>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}

const features = [
    {
      icon: Bot,
      title: "Conversational Interface",
      description: "Interact with your finances naturally. Ask Serva AI questions, request reports, and get summaries in plain English.",
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description: "Automate repetitive tasks like journal entries, reconciliations, and report generation, freeing up your time for strategic work.",
    },
    {
      icon: BrainCircuit,
      title: "Proactive Insights",
      description: "Serva AI doesn't just answer questions—it anticipates them. Get proactive alerts on anomalies, trends, and opportunities.",
    },
];

const testimonials = [
    {
        name: "Sarah Johnson, CPA",
        title: "Owner, Johnson & Associates",
        quote: "Mardisen Suite has completely transformed my practice. The time I save on manual data entry is now spent on high-value advisory services for my clients. Serva AI is a game-changer."
    },
    {
        name: "Michael Chen",
        title: "CFO, Innovate Inc.",
        quote: "As a fast-growing tech company, we need real-time financial visibility. Mardisen gives us exactly that. The AI-powered insights help us make smarter decisions, faster."
    },
    {
        name: "Emily Rodriguez",
        title: "Bookkeeper, E.R. Financials",
        quote: "The automated reconciliation and journal entry features have cut my month-end closing time in half. It's accurate, reliable, and incredibly intuitive to use."
    },
]

export default function LandingPage() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      {bannerVisible && (
        <div className="bg-primary text-primary-foreground text-center p-2 text-sm relative">
          Save 70% off annually on Mardisen Suite for your first year! Limited time only.
          <button onClick={() => setBannerVisible(false)} className="absolute top-1/2 right-4 -translate-y-1/2">x</button>
        </div>
      )}
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
                <Wand2 className="mr-2" />
                Powered by Serva AI
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                Financial Intelligence Meets AI Power
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Transform your accounting practice with Serva AI - the industry's first intelligent assistant that understands finance, automates workflows, and delivers insights in real-time.
              </p>
              <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2"><Check className="text-green-500" /> Automated Journal Entries</span>
                  <span className="flex items-center gap-2"><Check className="text-green-500" /> Intelligent Reconciliation</span>
              </div>
            </div>
            <div>
              <HeroCard />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold">Why Serva AI is Different</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Serva AI goes beyond simple automation. It's a true financial assistant built to understand the complexities of accounting.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {features.map((feature) => (
                        <Card key={feature.title} className="bg-background/50">
                            <CardHeader>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="mt-4">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
             <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold">Trusted by Industry Professionals</h2>
                    <p className="mt-4 text-lg text-muted-foreground">See what accountants and business owners are saying about Mardisen Suite.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name}>
                            <CardContent className="pt-6">
                                <div className="flex gap-0.5 mb-2">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500"/>)}
                                </div>
                                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                                <div className="mt-4">
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
