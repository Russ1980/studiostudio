
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Check, ArrowRight, ArrowLeft, Wand } from "lucide-react";
import { cn } from "@/lib/utils";

// Import step components
import { Step1Welcome } from "./steps/step1-welcome";
import { Step2SourceSelection } from "./steps/step2-source-selection";
import { Step3PreAssessment } from "./steps/step3-pre-assessment";
import { Step4BackupReminder } from "./steps/step4-backup-reminder";
import { Step5DataUpload } from "./steps/step5-data-upload";
import { Step6DataValidation } from "./steps/step6-data-validation";
import { Step7DataMapping } from "./steps/step7-data-mapping";
import { Step8TestImport } from "./steps/step8-test-import";
import { Step9FinalImport } from "./steps/step9-final-import";
import { Step10Completion } from "./steps/step10-completion";

const wizardSteps = [
  { id: 1, name: "Welcome" },
  { id: 2, name: "Source Selection" },
  { id: 3, name: "Pre-Assessment" },
  { id: 4, name: "Backup Reminder" },
  { id: 5, name: "Data Upload" },
  { id: 6, name: "Data Validation" },
  { id: 7, name: "Data Mapping" },
  { id: 8, name: "Test Import" },
  { id: 9, name: "Final Import" },
  { id: 10, name: "Completion" },
];

export default function DataMigrationWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < wizardSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1Welcome />;
      case 2: return <Step2SourceSelection />;
      case 3: return <Step3PreAssessment />;
      case 4: return <Step4BackupReminder />;
      case 5: return <Step5DataUpload />;
      case 6: return <Step6DataValidation />;
      case 7: return <Step7DataMapping />;
      case 8: return <Step8TestImport />;
      case 9: return <Step9FinalImport />;
      case 10: return <Step10Completion />;
      default: return <Step1Welcome />;
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Wand/> Data Migration Wizard</h1>
        <p className="text-muted-foreground">A guided experience to ensure a seamless data transition.</p>
      </div>
      <Card>
        <CardHeader>
          <ol className="flex items-center w-full">
            {wizardSteps.map((step, index) => (
              <li
                key={step.id}
                className={cn(
                  "flex w-full items-center",
                  index < wizardSteps.length - 1 &&
                    "after:content-[''] after:w-full after:h-1 after:border-b after:border-border after:border-4 after:inline-block"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full shrink-0",
                    currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                      ? "bg-primary/20 border-2 border-primary text-primary"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {currentStep > step.id ? <Check /> : step.id}
                </span>
              </li>
            ))}
          </ol>
        </CardHeader>
        <CardContent className="min-h-[400px]">
            {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2"/> Previous
          </Button>
          {currentStep < wizardSteps.length ? (
            <Button onClick={handleNext}>Next <ArrowRight className="ml-2"/></Button>
          ) : (
            <Button>Finish Migration</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
