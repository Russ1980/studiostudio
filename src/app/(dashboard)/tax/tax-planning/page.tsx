
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2, Lightbulb, BarChart, BrainCircuit } from "lucide-react";

const strategies = [
    { title: "Maximize Retirement Contributions", description: "Contribute the maximum allowed amount to 401(k) and IRA accounts to defer taxes." },
    { title: "Harvest Tax Losses", description: "Sell underperforming assets at a loss to offset capital gains and reduce your taxable income." },
    { title: "Utilize R&D Tax Credits", description: "Claim credits for research and development activities to significantly lower your tax bill." },
    { title: "Section 179 Deduction", description: "Immediately expense the full purchase price of qualifying equipment and/or software." },
];

export default function TaxPlanningPage() {
  return (
    <div className="grid gap-6">
       <div>
        <h1 className="text-3xl font-bold">Tax Planning</h1>
        <p className="text-muted-foreground">
            A proactive tool for forecasting future tax liabilities and exploring strategies to legally minimize the tax burden.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Scenario Planner</CardTitle>
                    <CardDescription>Run "what-if" scenarios to forecast your tax liability.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-1.5">
                        <Label htmlFor="scenario-name">Scenario Name</Label>
                        <Input id="scenario-name" placeholder="e.g., Aggressive Growth" />
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor="income">Projected Annual Income</Label>
                        <Input id="income" type="number" placeholder="$5,000,000" />
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor="deductions">Projected Deductions</Label>
                        <Input id="deductions" type="number" placeholder="$1,200,000" />
                    </div>
                     <div className="grid gap-1.5">
                        <Label htmlFor="year">Tax Year</Label>
                        <Input id="year" type="number" defaultValue="2024" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        <BarChart className="mr-2"/> Run Projection
                    </Button>
                </CardFooter>
            </Card>
             <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <BrainCircuit className="h-6 w-6" />
                        </div>
                        <div>
                             <CardTitle>AI-Powered Suggestions</CardTitle>
                             <CardDescription>Analyze your data for tax strategies.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full" variant="outline">
                        <Wand2 className="mr-2"/> Get Suggestions
                    </Button>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle>Tax Strategy Library</CardTitle>
                    <CardDescription>Explore common tax optimization strategies.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {strategies.map((strategy, index) => (
                            <li key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary shrink-0">
                                    <Lightbulb className="h-5 w-5 text-secondary-foreground" />
                                </div>
                                <div>
                                    <p className="font-medium">{strategy.title}</p>
                                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
