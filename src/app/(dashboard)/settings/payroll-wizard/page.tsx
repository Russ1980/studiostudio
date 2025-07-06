"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const steps = [
  { id: 1, name: "Welcome" },
  { id: 2, name: "Company Details" },
  { id: 3, name: "Bank Account" },
  { id: 4, name: "Add Employees" },
  { id: 5, name: "Tax Setup" },
  { id: 6, name: "Benefits" },
];

export default function PayrollWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Payroll Setup Wizard</h1>
        <p className="text-muted-foreground">A guided setup to get your payroll running in minutes.</p>
      </div>
      <Card>
        <CardHeader>
            <ol className="flex items-center w-full">
                {steps.map((step, index) => (
                    <li key={step.id} className={cn("flex w-full items-center", { "after:content-[''] after:w-full after:h-1 after:border-b after:border-border after:border-4 after:inline-block": index < steps.length - 1 })}>
                        <span className={cn("flex items-center justify-center w-10 h-10 rounded-full shrink-0", currentStep > step.id ? 'bg-primary text-primary-foreground' : currentStep === step.id ? 'bg-primary/20 border-2 border-primary text-primary' : 'bg-secondary text-secondary-foreground')}>
                            {currentStep > step.id ? <Check /> : step.id}
                        </span>
                    </li>
                ))}
            </ol>
        </CardHeader>
        <CardContent className="min-h-80 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold">{steps[currentStep-1].name}</h2>
                <p className="text-muted-foreground mt-2">Content for step {steps[currentStep-1].id} goes here.</p>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Previous
            </Button>
            {currentStep < steps.length ? (
                <Button onClick={handleNext}>Next</Button>
            ) : (
                <Button>Go Live!</Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
