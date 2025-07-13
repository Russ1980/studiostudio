
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Receipt, Wrench, Briefcase, Calculator, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { ChevronDown } from "lucide-react";

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


export default function ProductPage() {
  return (
    <>
    <header className="h-20 flex items-center container mx-auto px-4 md:px-6">
        <Link href="/" className="flex items-center justify-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold text-lg text-gray-900">Mardisen Suite</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 ml-10 text-sm font-medium text-gray-600">
            <Link href="/solutions" className="hover:text-gray-900">Solutions <ChevronDown className="inline-block h-4 w-4"/></Link>
            <Link href="/product" className="hover:text-gray-900 font-semibold text-primary">Product <ChevronDown className="inline-block h-4 w-4"/></Link>
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
        <Button asChild variant="outline">
            <Link href="/pricing">Get Started</Link>
        </Button>
        </div>
    </header>
    <div className="container mx-auto py-24 px-4 md:px-6">
       <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">A Fully Integrated Financial Suite</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Explore the powerful modules that make up Mardisen Suite, all powered by our intelligent Serva Assistant.
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
    </>
  );
}
