

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Receipt, Landmark, Calculator } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const guides = [
    { title: "Invoicing A-Z", description: "A complete guide to creating, sending, and managing invoices.", icon: Receipt, href: "#" },
    { title: "Mastering Bank Reconciliation", description: "Step-by-step instructions for reconciling your bank accounts.", icon: Landmark, href: "#" },
    { title: "Introduction to Payroll", description: "Learn how to set up and run payroll for your employees.", icon: Calculator, href: "#" },
];

export default function UserGuidesPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold">User Guides</h1>
                <p className="text-muted-foreground mt-2">
                    Comprehensive manuals and process documentation to help you master the application.
                </p>
                <div className="relative mt-4 max-w-lg mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search guides..." className="pl-9" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guides.map((guide, index) => (
                    <Link href={guide.href} key={index}>
                        <Card className="h-full hover:bg-muted/50 transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg">
                                    <guide.icon className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <div>
                                    <CardTitle>{guide.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{guide.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
