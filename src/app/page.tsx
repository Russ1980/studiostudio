
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import Image from 'next/image';
import { ChevronDown, Star, Bot, SlidersHorizontal, BarChart, CheckCircle2, DollarSign, AlertCircle, ArrowUp, Send, TerminalSquare, TrendingUp, Users, FileBarChart, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';


const FinancialHealthCard = () => (
    <Card className="bg-white/10 backdrop-blur-lg text-white shadow-xl rounded-2xl">
        <CardHeader className="p-4">
            <div className="flex justify-around items-center text-sm">
                <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                    <BarChart className="mr-2 h-4 w-4"/> Executive Overview
                </Button>
                <Button variant="ghost" className="text-white hover:text-white bg-white/10 rounded-full">
                    <DollarSign className="mr-2 h-4 w-4"/> Financial Health
                </Button>
                <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Zap className="mr-2 h-4 w-4"/> Serva AI Insights
                </Button>
                <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Users className="mr-2 h-4 w-4"/> Workflow Hub
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-400/20 to-green-400/5 border border-green-400/30">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="h-6 w-6 text-white"/>
                        </div>
                        <div>
                            <h4 className="font-semibold">Financial Health Score</h4>
                            <p className="text-xs text-white/70">Overall financial stability assessment</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-green-300">87</p>
                        <p className="text-xs text-right text-white/70">out of 100</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <Card className="bg-white/10 border-white/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-400"></div>Current Ratio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">2.4</p>
                        <p className="text-xs text-white/70">Liquidity measure</p>
                        <p className="text-xs font-semibold text-green-400 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3"/> Healthy</p>
                    </CardContent>
                </Card>
                 <Card className="bg-white/10 border-white/20">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-400 flex items-center justify-center"><BarChart className="h-2 w-2"/></div>Debt-to-Equity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">0.32</p>
                        <p className="text-xs text-white/70">Leverage ratio</p>
                        <p className="text-xs font-semibold text-green-400 flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3"/> Conservative</p>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
    </Card>
);


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-1">
        <section className="w-full bg-gradient-to-b from-[#151A3A] to-[#242E61] text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <header className="h-20 flex items-center">
                <Link href="/" className="flex items-center justify-center gap-2">
                    <Logo className="h-8 w-8" />
                    <span className="font-bold text-lg text-white">FinView</span>
                </Link>
                 <nav className="hidden lg:flex items-center gap-6 ml-10 text-sm font-medium text-white/80">
                    <Link href="#" className="hover:text-white">Product <ChevronDown className="inline-block h-4 w-4"/></Link>
                    <Link href="#" className="hover:text-white">Solutions <ChevronDown className="inline-block h-4 w-4"/></Link>
                    <Link href="/pricing" className="hover:text-white">Pricing</Link>
                    <Link href="/for-accountants" className="hover:text-white">For Accountants</Link>
                </nav>
                <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                    <Link href="/signin">
                    Log In
                    </Link>
                </Button>
                <Button asChild className="bg-slate-50 text-slate-900 hover:bg-slate-200 shadow-lg">
                    <Link href="/signin">Start for free</Link>
                </Button>
                </div>
            </header>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 py-16 md:py-24">
              <div className="flex flex-col justify-center space-y-6">
                <Badge variant="outline" className="w-fit bg-white/10 text-white border-white/20">
                  <Star className="h-4 w-4 mr-2 text-yellow-400 fill-yellow-400"/> #1 AI-Powered Financial Suite
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Automate Your Finances, Amplify Your Growth
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  FinView leverages cutting-edge AI to streamline your financial operations, from invoicing to forecasting, so you can focus on what matters most: growing your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg">Get Started Free →</Button>
                    <Button size="lg" variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:text-white">Contact Sales</Button>
                </div>
                <div className="flex items-center gap-6 pt-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400"/>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400/50"/>
                        <span className="ml-1 font-medium text-white">4.9/5 Rating</span>
                    </div>
                    <span>500+ businesses automated</span>
                     <span>$2.5M+ saved monthly</span>
                </div>
              </div>
              <div className="hidden lg:block">
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
                            <p className="text-muted-foreground">"FinView has been a game-changer. Serva AI automates our most tedious reconciliation tasks, freeing up my team to focus on high-value advisory services. We've cut our month-end close time by 40%."</p>
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
                    <span className="font-bold text-lg">FinView</span>
                </Link>
                <p className="text-xs text-muted-foreground">&copy; 2024 FinView Inc. All rights reserved.</p>
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
