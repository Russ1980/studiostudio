import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Building } from "lucide-react";

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
  );
}
