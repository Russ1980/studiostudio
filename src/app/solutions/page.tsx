
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Building } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { ChevronDown } from "lucide-react";


const solutions = [
  {
    title: "For Startups & Small Businesses",
    description: "Streamline your finances from day one. Get a clear view of your cash flow, manage invoices, and prepare for growth with our core accounting tools.",
    icon: Briefcase,
  },
  {
    title: "For Accounting Firms",
    description: "Manage your entire client portfolio from a single dashboard. Automate bookkeeping, streamline communication, and offer high-value advisory services.",
    icon: Users,
  },
  {
    title: "For Enterprises",
    description: "Integrate complex financial operations with our full suite. Manage payroll, operations, and tax with advanced AI-powered insights and controls.",
    icon: Building,
  },
]

export default function SolutionsPage() {
  return (
    <>
    <header className="h-20 flex items-center container mx-auto px-4 md:px-6">
        <Link href="/" className="flex items-center justify-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold text-lg text-gray-900">Mardisen Suite</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 ml-10 text-sm font-medium text-gray-600">
            <Link href="/solutions" className="hover:text-gray-900 font-semibold text-primary">Solutions <ChevronDown className="inline-block h-4 w-4"/></Link>
            <Link href="/product" className="hover:text-gray-900">Product <ChevronDown className="inline-block h-4 w-4"/></Link>
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
        <h1 className="text-4xl font-bold">Solutions Tailored for You</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Whether you're a growing business, an accounting professional, or a large enterprise, Mardisen Suite has a solution to fit your needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {solutions.map((solution) => (
          <Card key={solution.title}>
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                 <solution.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{solution.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">{solution.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </>
  );
}
