
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import Image from 'next/image';
import { ChevronDown, Star, AudioWaveform, SlidersHorizontal, BarChart, DollarSign, TrendingUp, Users, X, Zap, ChevronRight, BarChart2, AlertTriangle, ArrowUp, Send, CheckCircle, Quote, CreditCard, Search, BookOpen, Receipt, Wrench, Calculator, BarChart4 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function LandingPage() {
    const testimonials = [
        {
          name: "Sarah Chen",
          title: "CFO, TechFlow Solutions",
          avatar: "SC",
          quote: "Mardisen's Serva AI transformed our financial operations completely. We've reduced manual work by 80% and gained insights we never had before. The ROI was immediate.",
          metric: "80%",
          metricLabel: "Time Saved",
        },
        {
          name: "Michael Rodriguez",
          title: "Finance Director, GrowthCorp Inc.",
          avatar: "MR",
          quote: "The AI-powered insights have been game-changing. Serva AI catches errors before they become problems and suggests optimizations that have saved us thousands monthly.",
          metric: "$15K/mo",
          metricLabel: "Cost Savings",
        },
        {
          name: "Emily Watson",
          title: "Operations Manager, ScaleUp Ventures",
          avatar: "EW",
          quote: "Finally, a financial platform that understands our business. The automation is seamless, and the team collaboration features have streamlined our entire approval process.",
          metric: "3x",
          metricLabel: "Faster Processing",
        },
      ];

  const features = [
    {
      icon: BookOpen,
      title: "Core Accounting",
      description: "General ledger, chart of accounts, and financial statements."
    },
    {
      icon: Receipt,
      title: "Invoicing & A/R",
      description: "Create, send, and track invoices to manage receivables."
    },
    {
      icon: Wrench,
      title: "Operations",
      description: "Inventory, production, job costing, and logistics."
    },
    {
      icon: Calculator,
      title: "Intelligent Tax",
      description: "AI-powered tax planning, filing, and compliance tools."
    },
    {
      icon: DollarSign,
      title: "Payroll System",
      description: "Manage employees, run payroll, and handle tax compliance."
    },
    {
      icon: BarChart4,
      title: "Reports & Insights",
      description: "Deep analytics, custom reports, and AI-powered forecasting."
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-1">
        <section className="w-full bg-gradient-to-br from-[#151A3A] to-[#3A2D5C] overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
            <div className="container px-4 md:px-6 relative z-10">
                <header className="h-20 flex items-center">
                    <Link href="/" className="flex items-center justify-center gap-2">
                        <Logo className="h-8 w-8" />
                        <span className="font-bold text-lg text-white">Mardisen Suite</span>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-6 ml-10 text-sm font-medium text-gray-300">
                        <Link href="/solutions" className="hover:text-white">Solutions <ChevronDown className="inline-block h-4 w-4"/></Link>
                        <Link href="/product" className="hover:text-white">Product <ChevronDown className="inline-block h-4 w-4"/></Link>
                        <Link href="/for-accountants" className="hover:text-white">For Accountants</Link>
                        <Link href="/pricing" className="hover:text-white">Pricing</Link>
                        <Link href="/contact" className="hover:text-white">Contact</Link>
                    </nav>
                    <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                        <Link href="/signin">
                        Log In
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="bg-transparent border-white/50 text-white hover:bg-white hover:text-primary">
                        <Link href="/pricing">Get Started</Link>
                    </Button>
                    </div>
                </header>
            </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 py-16 md:py-24 text-center">
              <div className="flex flex-col items-center justify-center space-y-6">
                 <Badge variant="outline" className="w-fit bg-white/10 text-white border-white/20 py-1.5 px-3">
                    <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-300 fill-yellow-300"/>
                        <span className="font-semibold">#1 Financial Suite with Serva Assistant</span>
                    </div>
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 max-w-4xl mx-auto">
                  Watch our Serva Assistant <span className="text-red-400">easily handle your</span> most challenging <span className="text-blue-400">Financial</span> Operations
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl mx-auto">
                    Eliminate 80% of manual financial work with a Serva Assistant that never sleeps. From invoice processing to cash flow optimization, watch Serva Assistant transform your financial operations in real-time.
                </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg" asChild>
                        <Link href="/pricing">
                            Get Started Free
                            <ChevronRight className="h-4 w-4 ml-2"/>
                        </Link>
                    </Button>
                     <Button size="lg" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white" asChild>
                        <Link href="/contact">Schedule a Demo</Link>
                    </Button>
                </div>
                 <div className="flex items-center justify-center gap-6 pt-6 text-sm text-white">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400"/>)}
                        <span className="font-medium ml-1">4.9/5 Rating</span>
                    </div>
                    <p><span className="font-bold">500+</span> businesses automated</p>
                    <p><span className="font-bold">$2.5M+</span> saved monthly</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="serva" className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Serva AI Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Automate Your Workflow</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Serva is more than just a chatbot. It's a deeply integrated AI assistant that automates complex tasks, provides deep insights, and helps you make smarter decisions, faster.
                </p>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center text-center gap-2">
                <AudioWaveform className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Natural Language Interaction</h3>
                <p className="text-muted-foreground">Ask complex questions like "What was our highest spending category last quarter?" and get instant, accurate answers and reports.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                <SlidersHorizontal className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Workflow Automation</h3>
                <p className="text-muted-foreground">Serva can automate multi-step processes like month-end closing, invoice reminders, and data categorization based on your instructions.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                <BarChart className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Proactive Insights</h3>
                <p className="text-muted-foreground">Serva doesn't just answer questions; it proactively identifies anomalies, trends, and opportunities you might have missed.</p>
                </div>
            </div>
            </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <Badge variant="outline" className="py-1.5 px-3 bg-primary/10 text-primary border-primary/20">
                        <Zap className="h-4 w-4 mr-2 text-primary" />
                        An End-to-End Financial Intelligence Platform
                    </Badge>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        From core accounting to intelligent tax planning, Mardisen Suite provides a fully integrated set of tools to run your entire financial operations. No more data silos or jumping between apps.
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-2">
                  <div className="flex flex-col gap-8">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <feature.icon className="h-5 w-5 text-primary"/>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                      <Image 
                          src="https://storage.googleapis.com/project-charm-gcp-static-assets/mardsen-dashboard-screenshot.png"
                          alt="Mardisen Suite Dashboard"
                          width={1024}
                          height={665}
                          className="rounded-xl shadow-2xl"
                          data-ai-hint="dashboard screenshot"
                      />
                  </div>
                </div>
            </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <Badge variant="outline" className="py-1.5 px-3 bg-primary/10 text-primary border-primary/20">
                        <Star className="h-4 w-4 mr-2 text-primary" />
                        Customer Success Stories
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Leading Businesses</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        See how companies like yours are transforming their financial operations with Mardisen's AI-powered suite.
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3 lg:gap-8">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name} className="bg-slate-50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                    <span className="text-sm font-semibold text-muted-foreground">5.0</span>
                                </div>
                                <div className="relative">
                                     <Quote className="absolute -top-3 -left-3 h-12 w-12 text-slate-100" />
                                    <p className="text-muted-foreground relative z-10">"{testimonial.quote}"</p>
                                </div>
                                <div className="p-4 rounded-lg bg-green-500/10">
                                    <p className="text-2xl font-bold text-green-600">{testimonial.metric}</p>
                                    <p className="text-sm text-green-700/80">{testimonial.metricLabel}</p>
                                </div>
                                <div className="flex items-center gap-4 pt-2">
                                    <Avatar>
                                        <AvatarFallback className="bg-primary text-primary-foreground">{testimonial.avatar}</AvatarFallback>
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
      </main>
      <footer className="border-t">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 py-12 px-4 md:px-6">
            <div className="col-span-2 md:col-span-1">
                 <Link href="/" className="flex items-center justify-start gap-2 mb-4">
                    <Logo className="h-8 w-8" />
                    <span className="font-bold text-lg">Mardisen Suite</span>
                </Link>
                <p className="text-xs text-muted-foreground">&copy; 2024 Mardisen Suite Inc. All rights reserved.</p>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Product</h4>
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <Link href="/product" className="hover:underline">Features</Link>
                    <Link href="/pricing" className="hover:underline">Pricing</Link>
                    <Link href="/help/legal" className="hover:underline">Security</Link>
                </nav>
            </div>
            <div>
                 <h4 className="font-semibold mb-2">Solutions</h4>
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <Link href="/solutions" className="hover:underline">For Startups</Link>
                    <Link href="/for-accountants" className="hover:underline">For Accountants</Link>
                    <Link href="/solutions" className="hover:underline">For Enterprises</Link>
                </nav>
            </div>
            <div>
                 <h4 className="font-semibold mb-2">Resources</h4>
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <Link href="#" className="hover:underline">Blog</Link>
                    <Link href="/help" className="hover:underline">Help Center</Link>
                    <Link href="/contact" className="hover:underline">Contact Us</Link>
                </nav>
            </div>
             <div>
                 <h4 className="font-semibold mb-2">Company</h4>
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <Link href="#" className="hover:underline">About Us</Link>
                    <Link href="#" className="hover:underline">Careers</Link>
                    <Link href="/help/legal" className="hover:underline">Legal</Link>
                </nav>
            </div>
        </div>
      </footer>
    </div>
  );
}
