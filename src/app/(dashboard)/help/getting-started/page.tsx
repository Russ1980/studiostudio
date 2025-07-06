

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, User, Landmark, BookOpen } from "lucide-react";
import Link from "next/link";

const guides = [
  { 
    title: "1. Complete Your Company Profile", 
    description: "Fill out your company's information to ensure it appears correctly on invoices and reports.", 
    icon: User,
    href: "/settings/company",
    cta: "Go to Company Settings"
  },
  { 
    title: "2. Connect Your Bank Accounts", 
    description: "Securely link your bank and credit card accounts to automatically import transactions.", 
    icon: Landmark,
    href: "/banking/connections",
    cta: "Connect Accounts"
  },
  { 
    title: "3. Set Up Your Chart of Accounts", 
    description: "Import your existing Chart of Accounts or use our template to get started with accurate bookkeeping.", 
    icon: BookOpen,
    href: "/accounting/chart-of-accounts",
    cta: "View Chart of Accounts"
  },
];

export default function GettingStartedPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Getting Started Guide</h1>
        <p className="text-muted-foreground">
          Follow these essential first steps to set up your account and learn the basics.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Card key={guide.title}>
            <CardHeader>
              <div className="flex items-center gap-4">
                 <div className="bg-secondary p-3 rounded-lg">
                    <guide.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>{guide.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{guide.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={guide.href}>{guide.cta}</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
