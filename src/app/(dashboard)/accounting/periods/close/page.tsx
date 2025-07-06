
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { Lock, FileCheck2, Banknote, Receipt, AlertTriangle } from "lucide-react";

const closingSteps = [
    { id: 'reconcile-bank', label: 'Reconcile all bank and credit card accounts', completed: true },
    { id: 'review-ar', label: 'Review outstanding A/R and send reminders', completed: true },
    { id: 'review-ap', label: 'Review and approve all outstanding A/P', completed: false },
    { id: 'record-accruals', label: 'Record all necessary accruals and deferrals', completed: false },
    { id: 'record-depreciation', label: 'Record fixed asset depreciation', completed: true },
    { id: 'review-inventory', label: 'Review inventory values and make adjustments', completed: false },
    { id: 'run-financials', label: 'Run preliminary financial statements for review', completed: false },
    { id: 'final-review', label: 'Final review with management', completed: false },
];

export default function ClosePeriodPage() {
    const [steps, setSteps] = useState(closingSteps);

    const handleStepToggle = (id: string) => {
        setSteps(prevSteps => 
            prevSteps.map(step => 
                step.id === id ? { ...step, completed: !step.completed } : step
            )
        );
    };
    
    const completedCount = steps.filter(step => step.completed).length;
    const progress = (completedCount / steps.length) * 100;
    const allStepsCompleted = completedCount === steps.length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Close Accounting Period</h1>
        <p className="text-muted-foreground">
          Follow this checklist to ensure a smooth and accurate period-end close for June 2024.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Period-End Closing Checklist</CardTitle>
            <CardDescription>Complete all steps before closing the period to prevent future errors.</CardDescription>
            <div className="pt-4">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">{completedCount} of {steps.length} steps completed</p>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {steps.map(step => (
                     <div key={step.id} className="flex items-center space-x-3">
                        <Checkbox 
                            id={step.id} 
                            checked={step.completed} 
                            onCheckedChange={() => handleStepToggle(step.id)}
                        />
                        <Label 
                            htmlFor={step.id} 
                            className={`flex-1 text-sm ${step.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                        >
                            {step.label}
                        </Label>
                    </div>
                ))}
            </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 border-t pt-6">
            <div className="flex items-start p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5 mr-3 mt-1 shrink-0" />
                <div>
                    <h4 className="font-semibold">Warning</h4>
                    <p className="text-sm">Closing the period is a final action. Once closed, transactions within this period cannot be edited without reopening the period, which requires special permissions.</p>
                </div>
            </div>
            <Button size="lg" disabled={!allStepsCompleted}>
                <Lock className="mr-2"/> Close Period for June 2024
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
