
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo, NIcon } from '@/components/icons';
import Image from 'next/image';
import { ChevronDown, X, CheckCircle2, Bot, SlidersHorizontal, BarChart, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <div className="bg-primary text-primary-foreground text-center p-2 text-sm flex items-center justify-center gap-4">
        <span>Save 70% off annually on Mardisen Suite for your first year! Limited time only.</span>
        <button className="text-primary-foreground/80 hover:text-primary-foreground"><X className="h-4 w-4" /></button>
      </div>
      <header className="px-4 lg:px-6 h-16 flex items-center container mx-auto sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-bold text-lg">Mardisen Suite</span>
        </Link>
        <nav className="ml-10 hidden lg:flex gap-4 sm:gap-6 items-center">
          <Link href="/solutions" className="text-sm font-medium hover:text-primary flex items-center gap-1">Solutions <ChevronDown className="h-4 w-4" /></Link>
          <Link href="/product" className="text-sm font-medium hover:text-primary flex items-center gap-1">Product <ChevronDown className="h-4 w-4" /></Link>
          <Link href="/for-accountants" className="text-sm font-medium hover:text-primary">For Accountants</Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
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
      </header>
      <main className="flex-1">
        <section className="w-full bg-[#020420] text-white overflow-hidden">
            <div className="container px-4 md:px-6 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#020420] via-transparent to-transparent opacity-50 z-0"></div>
                <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px] py-24 lg:py-32 relative z-10">
                <div className="flex flex-col justify-center space-y-4">
                    <Badge variant="outline" className="w-fit bg-white/10 text-white border-white/20">
                    <Sparkles className="h-4 w-4 mr-2 text-purple-400"/> Powered by Serva AI <Badge variant="secondary" className="ml-2 bg-green-400/20 text-green-300 border-none">LIVE</Badge>
                    </Badge>
                    <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Financial Intelligence Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI Power</span>
                    </h1>
                    <p className="max-w-[600px] text-gray-300 md:text-xl">
                        Transform your accounting practice with Serva AI - the industry's first intelligent assistant that understands finance, automates workflows, and delivers insights in real-time.
                    </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                        <div className="flex items-center gap-2">
                            <NIcon />
                            <span className="text-sm font-medium">Automated Journal Entries</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-green-400" />
                            <span className="text-sm font-medium">Intelligent Reconciliation</span>
                        </div>
                    </div>
                </div>
                <Image
                    src="https://placehold.co/650x500.png"
                    width="650"
                    height="500"
                    alt="Hero"
                    className="mx-auto aspect-[650/500] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                    data-ai-hint="financial dashboard chart"
                />
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
