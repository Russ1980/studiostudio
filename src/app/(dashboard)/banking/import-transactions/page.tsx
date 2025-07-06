
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { UploadCloud, File, CheckCircle, ArrowRight, Table } from "lucide-react";
import Link from 'next/link';

export default function ImportBankTransactionsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Import Bank Transactions</h1>
        <p className="text-muted-foreground">
          Follow the steps below to import your bank statement from a CSV, OFX, or QFX file.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
             <CardTitle>Import Wizard</CardTitle>
             <div className="text-sm text-muted-foreground">Step {currentStep} of 3</div>
          </div>
        </CardHeader>
        <CardContent className="min-h-[400px]">
          {currentStep === 1 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <UploadCloud className="w-16 h-16 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Upload Your Bank Statement</h3>
              <p className="text-muted-foreground mb-4">Drag and drop your file here, or click to browse.</p>
              <div className="w-full max-w-md">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                  <span>{fileName ? `Selected: ${fileName}` : 'Select a file'}</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv,.ofx,.qfx" />
                </label>
                {fileName && <p className="text-xs text-muted-foreground mt-2">Supported formats: CSV, OFX, QFX.</p>}
              </div>
            </div>
          )}
          {currentStep === 2 && (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Table className="w-16 h-16 mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Field Mapping</h3>
                <p className="text-muted-foreground max-w-md mb-4">Map the columns from your file (e.g., "Date", "Description", "Amount") to the corresponding fields in our system.</p>
                <p className="text-muted-foreground text-sm">This feature is coming soon.</p>
             </div>
          )}
          {currentStep === 3 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <CheckCircle className="w-16 h-16 mb-4 text-success" />
                <h3 className="text-xl font-semibold mb-2">Review and Confirm</h3>
                <p className="text-muted-foreground max-w-md mb-4">You will see a preview of the transactions to be imported and confirm to finalize the process.</p>
                <p className="text-muted-foreground text-sm">This feature is coming soon.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
            {currentStep < 3 ? (
                <Button onClick={handleNextStep} disabled={!fileName}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button asChild>
                   <Link href="/banking/review-transactions">Finish Import</Link>
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
