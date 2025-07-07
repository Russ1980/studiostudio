
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import Image from 'next/image';
import { ChevronDown, Star, Bot, SlidersHorizontal, BarChart, CheckCircle2, DollarSign, TrendingUp, Users, X, Zap, ChevronRight, BarChart2, AlertTriangle, ArrowUp, Send, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';


const ServaUICard = () => {
    const actions = [
        { status: 'active', text: 'Launching Serva AI', time: '2 seconds ago' },
        { status: 'processing', text: 'Processing tax optimization strategies...', time: '8 seconds ago' },
        { status: 'completed', text: 'Cash flow optimization complete', time: '15 seconds ago' },
    ];
    
    const getStatusBadge = (status:string) => {
        switch (status) {
            case 'active': return <Badge variant="outline" className="text-blue-400 border-blue-400/50 bg-blue-400/10">active</Badge>;
            case 'processing': return <Badge variant="outline" className="text-purple-400 border-purple-400/50 bg-purple-400/10">processing</Badge>;
            case 'completed': return <Badge variant="outline" className="text-green-400 border-green-400/50 bg-green-400/10">completed</Badge>;
            default: return null;
        }
    }

    return (
        <Card className="bg-slate-800/50 text-white backdrop-blur-lg border-white/20 shadow-2xl rounded-2xl w-full max-w-md mx-auto">
            <CardHeader className="p-4 flex flex-row items-center justify-between border-b border-white/20">
                <div>
                    <h3 className="font-bold text-lg">SERVA</h3>
                    <p className="text-xs text-slate-400">SOC 2 & HIPAA compliant</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-400">Active Processes</p>
                    <p className="text-2xl font-bold bg-gradient-to-br from-purple-400 to-indigo-500 text-white px-3 py-1 rounded-md">24</p>
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <Card className="bg-slate-700/50 border-white/20">
                    <CardHeader className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bot className="h-4 w-4 text-blue-400" />
                                <span className="text-sm font-semibold">SERVA</span>
                                <span className="text-xs text-slate-400">2 seconds ago</span>
                            </div>
                            <Badge variant="outline" className="text-red-400 border-red-400/50 bg-red-400/10">High Priority</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <p className="font-semibold mb-2">Launching Serva AI 🚀</p>
                        <p className="text-sm text-slate-300 mb-3">Your personal AI is analyzing 15 financial reports and identified 3 optimization opportunities worth $12,400.</p>
                        <div className="flex items-center gap-2 text-sm">
                            <ArrowUp className="h-4 w-4 text-green-400"/>
                            <span className="font-bold text-white">$12,400</span>
                            <span className="text-green-400 font-semibold">+$2,100</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-slate-700/50 border-white/20 p-3">
                        <p className="text-xs text-slate-400">Time Saved Today</p>
                        <div className="flex items-end justify-between">
                            <p className="text-2xl font-bold">42h</p>
                            <BarChart2 className="h-6 w-6 text-slate-400" />
                        </div>
                        <p className="text-xs text-green-400">+12% vs yesterday</p>
                    </Card>
                    <Card className="bg-slate-700/50 border-white/20 p-3">
                        <p className="text-xs text-slate-400">Tasks Completed</p>
                        <div className="flex items-end justify-between">
                            <p className="text-2xl font-bold">156</p>
                            <CheckCircle className="h-6 w-6 text-slate-400" />
                        </div>
                        <p className="text-xs text-green-400">+28 this hour</p>
                    </Card>
                    <Card className="bg-slate-700/50 border-white/20 p-3">
                        <p className="text-xs text-slate-400">Savings Generated</p>
                        <div className="flex items-end justify-between">
                            <p className="text-2xl font-bold">$12,400</p>
                             <DollarSign className="h-6 w-6 text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-400">This month</p>
                    </Card>
                    <Card className="bg-orange-500/10 border-orange-500/30 p-3">
                        <p className="text-xs text-orange-300">Active Alerts</p>
                        <div className="flex items-end justify-between">
                            <p className="text-2xl font-bold text-orange-300">3</p>
                             <AlertTriangle className="h-6 w-6 text-orange-300" />
                        </div>
                        <p className="text-xs text-orange-300">Require attention</p>
                    </Card>
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-2">Recent AI Actions</h4>
                    <ul className="space-y-2">
                        {actions.map(action => (
                            <li key={action.text} className="flex items-center justify-between text-sm p-2 bg-slate-700/50 rounded-md">
                               <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${action.status === 'completed' ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                                  <span className="text-slate-300">{action.text}</span>
                               </div>
                               <div className="flex items-center gap-4">
                                  <span className="text-xs text-slate-400">{action.time}</span>
                                  {getStatusBadge(action.status)}
                               </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
            <CardFooter className="p-2 border-t border-white/20 flex items-center justify-between">
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Element
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white text-xs">Send Console Errors (2)</Button>
            </CardFooter>
        </Card>
    );
};


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-1">
        <section className="w-full bg-gradient-to-br from-[#151A3A] to-[#3A2D5C] text-white overflow-hidden relative">
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
                        <Link href="/signin">Get Started</Link>
                    </Button>
                    </div>
                </header>
            </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 py-16 md:py-24">
              <div className="flex flex-col justify-center space-y-6">
                 <Badge variant="outline" className="w-fit bg-white/10 text-white border-white/20 py-1.5 px-3">
                    <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-300 fill-yellow-300"/>
                        <span className="font-semibold">#1 Financial Suite with Serva Assistant</span>
                    </div>
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                  Watch our Serva Assistant <span className="text-red-400">easily handle your</span> most challenging <span className="text-blue-400">Financial</span> Operations
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Eliminate 80% of manual financial work with a Serva Assistant that never sleeps. From invoice processing to cash flow optimization, watch Serva Assistant transform your financial operations in real-time.
                </p>
                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg">
                        Get Started Free
                        <ChevronRight className="h-4 w-4 ml-2"/>
                    </Button>
                     <Button size="lg" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                        Schedule a Demo
                    </Button>
                </div>
                 <div className="flex items-center gap-6 pt-6 text-sm">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400"/>)}
                        <span className="font-medium ml-1">4.9/5 Rating</span>
                    </div>
                    <p><span className="font-bold">500+</span> businesses automated</p>
                    <p><span className="font-bold">$2.5M+</span> saved monthly</p>
                 </div>
              </div>
              <div className="hidden lg:flex items-center justify-center -mr-16">
                <ServaUICard />
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
