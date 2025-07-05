
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileUp, Folder, ShieldHalf, BarChart4 } from "lucide-react";


const complianceTools = [
    { 
        title: "Tax Calendar", 
        description: "View and track all federal, state, and local filing deadlines.", 
        icon: Calendar,
        href: "#"
    },
    { 
        title: "E-File Center", 
        description: "A direct link to the tax filings page to manage all submissions.", 
        icon: FileUp,
        href: "/tax/tax-filings"
    },
    { 
        title: "Document Repository", 
        description: "Access all tax-related documents securely stored in one place.", 
        icon: Folder,
        href: "/accountant-portal/document-management"
    },
    { 
        title: "Audit Defense", 
        description: "Tools and resources for responding to tax audits (coming soon).", 
        icon: ShieldHalf,
        href: "#"
    },
];

export default function TaxCompliancePage() {
  return (
    <div className="grid gap-6">
       <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">Tax Compliance Center</h1>
                <p className="text-muted-foreground">
                    A dedicated hub for managing all tasks and documents related to tax compliance and audit preparedness.
                </p>
            </div>
            <Button variant="outline"><BarChart4 className="mr-2"/> Generate Compliance Report</Button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceTools.map((tool, index) => (
          <Link href={tool.href} key={index}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="bg-secondary p-3 rounded-lg">
                            <tool.icon className="h-6 w-6 text-secondary-foreground" />
                        </div>
                        <CardTitle>{tool.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription>{tool.description}</CardDescription>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
