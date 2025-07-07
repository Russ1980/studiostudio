
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import {
  ChevronDown,
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
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <button className="w-full text-left">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-orange-500" />
                      <span>Credit Score</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                </div>
                <p className="text-3xl font-bold">745</p>
              </button>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <button className="w-full text-left">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-indigo-500" />
                      <span>Total Assets</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                </div>
                <p className="text-3xl font-bold">$2,450,000</p>
              </button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}


function ScreenshotWidget() {
    return (
        <div className="absolute bottom-5 right-5 flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                <button className="flex items-center gap-1 hover:text-slate-300"><MousePointerClick className="h-3 w-3" /> Select element</button>
                <div className="h-4 w-px bg-slate-600"></div>
                <button className="flex items-center gap-1 hover:text-slate-300"><MessageSquare className="h-3 w-3" /> Send logs</button>
                 <div className="h-4 w-px bg-slate-600"></div>
                <button className="flex items-center gap-1 hover:text-slate-300"><Camera className="h-3 w-3" /> Screenshot</button>
            </div>
             <button className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700">
                <Menu className="h-5 w-5"/>
            </button>
        </div>
    )
}

function NextLogoIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M11.9999 19.5L12 4.5L5.67383 17.5H18.326L11.9999 4.5V19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    );
}

export default function LandingPage() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="flex flex-col min-h-dvh bg-white text-gray-800">
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-600 text-white text-center p-2 text-sm overflow-hidden"
          >
            <div className="container mx-auto flex items-center justify-center">
              <span>Save 70% off annually on Mardisen Suite for your first year! Limited time only.</span>
              <button onClick={() => setShowBanner(false)} className="ml-4 p-1 rounded-full hover:bg-blue-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-blue-600" />
            <span className="font-semibold text-lg">Mardisen <span className="text-gray-500">Suite</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="flex items-center gap-1 hover:text-blue-600">Solutions <ChevronDown className="h-4 w-4" /></Link>
            <Link href="#" className="flex items-center gap-1 hover:text-blue-600">Product <ChevronDown className="h-4 w-4" /></Link>
            <Link href="#" className="hover:text-blue-600">For Accountants</Link>
            <Link href="#" className="hover:text-blue-600">Pricing</Link>
            <Link href="#" className="hover:text-blue-600">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/signin">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signin">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
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
                  <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-400"></span>
                  <span className="ml-1 text-xs font-semibold text-green-300">LIVE</span>
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
                  Financial Intelligence Meets <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">AI Power</span>
                </h1>
                <p className="max-w-xl text-lg text-gray-300">
                  Transform your accounting practice with Serva AI - the industry's first intelligent assistant that understands finance, automates workflows, and delivers insights in real-time.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400"/>
                        Automated Journal Entries
                    </div>
                     <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400"/>
                        Intelligent Reconciliation
                    </div>
                </div>
              </div>

              <div className="relative">
                <FinancialCard />
                <ScreenshotWidget/>
                 <div className="absolute bottom-5 left-5 h-10 w-10 bg-black/30 rounded-full flex items-center justify-center border border-white/10">
                    <NextLogoIcon/>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
