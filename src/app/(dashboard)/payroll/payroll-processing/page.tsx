
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
import { Users, Calculator, Banknote, Zap } from "lucide-react";


const steps = [
    { 
        step: 1, 
        title: "Preparation", 
        description: "Verify employee data, approve time entries, and check for any outstanding issues before running calculations.",
        icon: Users,
        action: "Start Preparation"
    },
    { 
        step: 2, 
        title: "Processing", 
        description: "Run payroll calculations, review the summary for accuracy, and make any necessary adjustments.",
        icon: Calculator,
        action: "Start Processing"
    },
    { 
        step: 3, 
        title: "Payment & Filing", 
        description: "Disburse payments to employees, schedule tax payments, and file necessary payroll reports.",
        icon: Banknote,
        action: "Start Payments"
    },
];

export default function PayrollProcessingPage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
        <div>
          <h1 className="text-3xl font-bold">Payroll Processing</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            A guided, step-by-step interface for executing a payroll run. Follow the steps below to ensure an accurate and compliant payroll.
          </p>
        </div>
        <Button size="lg"><Zap className="mr-2"/>Start New Pay Run</Button>

        <div className="grid w-full max-w-5xl gap-8 md:grid-cols-3 mt-8">
            {steps.map((step, index) => (
                <Card key={step.step} className="text-left">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <step.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <CardDescription>Step {step.step}</CardDescription>
                                <CardTitle>{step.title}</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant={index > 0 ? "outline" : "default"}>{step.action}</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
