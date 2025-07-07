
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo, NIcon } from '@/components/icons';
import Image from 'next/image';
import { ChevronDown, Star, Bot, SlidersHorizontal, BarChart, CheckCircle2, DollarSign, TrendingUp, Users, X, Zap, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';


const FinancialHealthCard = () => (
    <Card className="bg-white text-gray-800 shadow-2xl rounded-2xl border border-gray-200/50">
        <CardHeader className="p-4 border-b">
            <div className="flex justify-around items-center text-sm">
                <Button variant="ghost" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 text-xs h-8">
                    <BarChart className="mr-2 h-4 w-4"/> Executive Overview
                </Button>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 bg-blue-100 font-semibold rounded-full text-xs h-8">
                    <DollarSign className="mr-2 h-4 w-4"/> Financial Health
                </Button>
                <Button variant="ghost" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 text-xs h-8">
                    <Zap className="mr-2 h-4 w-4"/> Serva AI Insights
                </Button>
                <Button variant="ghost" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 text-xs h-8">
                    <Users className="mr-2 h-4 w-4"/> Workflow Hub
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200/80">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="h-6 w-6 text-white"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Financial Health Score</h4>
                            <p className="text-xs text-gray-500">Overall financial stability assessment</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-green-600">87</p>
                        <p className="text-xs text-right text-gray-500">out of 100</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <Card className="bg-white border-gray-200/80 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Current Ratio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-900">2.4</p>
                        <p className="text-xs text-gray-500">Liquidity measure</p>
                        <p className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3"/> Healthy</p>
                    </CardContent>
                </Card>
                 <Card className="bg-white border-gray-200/80 shadow-none">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600"><div className="w-2 h-2 rounded-full bg-purple-500"></div>Debt-to-Equity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-900">0.32</p>
                        <p className="text-xs text-gray-500">Leverage ratio</p>
                        <p className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3"/> Conservative</p>
                    </CardContent>
                </Card>
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <Card className="bg-white border-gray-200/80 shadow-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between text-gray-600">Credit Score <ChevronRight className="h-4 w-4" /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-900">745</p>
                    </CardContent>
                </Card>
                 <Card className="bg-white border-gray-200/80 shadow-none">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between text-gray-600">Revenue <ChevronRight className="h-4 w-4" /></CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-3xl font-bold text-gray-900">$2,450,000</p>
                     </CardContent>
                </Card>
             </div>
        </CardContent>
        <CardFooter className="p-2 border-t border-gray-200/80">
            <div className="flex items-center justify-around w-full text-xs text-gray-500">
                <Button variant="ghost" size="sm" className="text-xs">Select element</Button>
                <Button variant="ghost" size="sm" className="text-xs">Send logs</Button>
                <Button variant="ghost" size="sm" className="text-xs">Screenshot</Button>
            </div>
        </CardFooter>
    </Card>
);


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
       <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm font-medium relative">
            Save 70% off annually on Mardisen Suite for your first year! Limited time only.
            <button className="absolute right-4 top-1/2 -translate-y-1/2"><X className="h-4 w-4"/></button>
        </div>
        <div className="container px-4 md:px-6">
            <div className="h-16 flex items-center">
                <Link href="/" className="flex items-center justify-center gap-2">
                    <Logo className="h-8 w-8" />
                    <span className="font-bold text-lg text-gray-900">Mardisen Suite</span>
                </Link>
                <nav className="hidden lg:flex items-center gap-6 ml-10 text-sm font-medium text-gray-600">
                    <Link href="/solutions" className="hover:text-primary">Solutions <ChevronDown className="inline-block h-4 w-4"/></Link>
                    <Link href="/product" className="hover:text-primary">Product <ChevronDown className="inline-block h-4 w-4"/></Link>
                    <Link href="/for-accountants" className="hover:text-primary">For Accountants</Link>
                    <Link href="/pricing" className="hover:text-primary">Pricing</Link>
                    <Link href="/contact" className="hover:text-primary">Contact</Link>
                </nav>
                <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/signin">
                    Log In
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/signin">Get Started</Link>
                </Button>
                </div>
            </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full bg-[#151A3A] text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 py-16 md:py-24">
              <div className="flex flex-col justify-center space-y-6">
                 <Badge variant="outline" className="w-fit bg-white/10 text-white border-white/20 py-1.5 px-3">
                    <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-300"/>
                        <span className="font-semibold">Powered by Serva AI</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-xs text-green-400 font-bold">LIVE</span>
                    </div>
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                  Financial Intelligence Meets Serva Assistant
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Transform your accounting practice with Serva AI - the industry's first intelligent assistant that understands finance, automates workflows, and delivers insights in real-time.
                </p>
                 <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2">
                        <NIcon />
                        <span className="font-medium">Automated Journal Entries</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400"/>
                        <span className="font-medium">Intelligent Reconciliation</span>
                    </div>
                </div>
              </div>
              <div className="hidden lg:block -mr-16">
                <FinancialHealthCard />
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
                <Bot className="h-10 w-10 text-primary" />
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

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Loved by Modern Accounting Teams</h2>
                <div className="grid gap-8 lg:grid-cols-2">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar>
                                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person" />
                                    <AvatarFallback>JS</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Jane Smith, CPA</p>
                                    <p className="text-sm text-muted-foreground">Owner, Smith Accounting</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">"Mardisen Suite has been a game-changer. Serva AI automates our most tedious reconciliation tasks, freeing up my team to focus on high-value advisory services. We've cut our month-end close time by 40%."</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar>
                                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="man" />
                                    <AvatarFallback>MD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Michael Davis</p>
                                    <p className="text-sm text-muted-foreground">CFO, Innovate Inc.</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">"The financial insights we get from Serva are unparalleled. It's like having a data analyst on our team 24/7. We identified a major cost-saving opportunity within the first month of use that paid for the software ten times over."</p>
                        </CardContent>
                    </Card>
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
                    <Link href="#" className="hover:underline">Features</Link>
                    <Link href="/pricing" className="hover:underline">Pricing</Link>
                    <Link href="#" className="hover:underline">Security</Link>
                </nav>
            </div>
            <div>
                 <h4 className="font-semibold mb-2">Solutions</h4>
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <Link href="#" className="hover:underline">For Startups</Link>
                    <Link href="/for-accountants" className="hover:underline">For Accountants</Link>
                    <Link href="#" className="hover:underline">For Enterprises</Link>
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
