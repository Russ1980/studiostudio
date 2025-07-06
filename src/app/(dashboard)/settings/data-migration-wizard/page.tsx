
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
import { MigrationWizardProvider, useMigrationWizard } from "./context/migration-wizard-context";

import { Step1Welcome } from "./components/step1-welcome";
import { Step2SourceSelection } from "./components/step2-source-selection";
import { Step3PreAssessment } from "./components/step3-pre-assessment";
import { Step4BackupReminder } from "./components/step4-backup-reminder";
import { Step5DataUpload } from "./components/step5-data-upload";
import { Step6DataValidation } from "./components/step6-data-validation";
import { Step7DataMapping } from "./components/step7-data-mapping";
import { Step8TestImport } from "./components/step8-test-import";
import { Step9FinalImport } from "./components/step9-final-import";
import { Step10Completion } from "./components/step10-completion";

const wizardSteps = [
  { id: 1, name: "Welcome", component: Step1Welcome },
  { id: 2, name: "Source Selection", component: Step2SourceSelection },
  { id: 3, name: "Pre-Assessment", component: Step3PreAssessment },
  { id: 4, name: "Backup Reminder", component: Step4BackupReminder },
  { id: 5, name: "Data Upload", component: Step5DataUpload },
  { id: 6, name: "Data Validation", component: Step6DataValidation },
  { id: 7, name: "Data Mapping", component: Step7DataMapping },
  { id: 8, name: "Test Import", component: Step8TestImport },
  { id: 9, name: "Final Import", component: Step9FinalImport },
  { id: 10, name: "Completion", component: Step10Completion },
];

function DataMigrationWizardContent() {
  const { currentStep, setCurrentStep, migrationData } = useMigrationWizard();

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

  const isNextDisabled = () => {
    switch (currentStep) {
      case 2:
        return !migrationData.sourceSystem;
      case 4:
        return !migrationData.backupConfirmed;
      // Add other step-specific validation here
      default:
        return false;
    }
  };
  
  const CurrentStepComponent = wizardSteps[currentStep-1].component;

  return (
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
            <CurrentStepComponent />
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2"/> Previous
          </Button>
          {currentStep < wizardSteps.length ? (
            <Button onClick={handleNext} disabled={isNextDisabled()}>Next <ArrowRight className="ml-2"/></Button>
          ) : (
            <Button>Finish Migration</Button>
          )}
        </CardFooter>
      </Card>
  )
}


export default function DataMigrationWizardPage() {
  return (
    <MigrationWizardProvider>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Wand/> Data Migration Wizard</h1>
          <p className="text-muted-foreground">A guided experience to ensure a seamless data transition.</p>
        </div>
        <DataMigrationWizardContent />
      </div>
    </MigrationWizardProvider>
  );
}
