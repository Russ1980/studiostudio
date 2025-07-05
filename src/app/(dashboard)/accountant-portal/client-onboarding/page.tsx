"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Upload, Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Client Profile" },
  { id: 2, name: "Subscription" },
  { id: 3, name: "Data Migration" },
  { id: 4, name: "Configuration & Access" },
];

export default function ClientOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

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
        <h1 className="text-3xl font-bold">Client Onboarding</h1>
        <p className="text-muted-foreground">
          Follow the steps to get your new client set up and ready to go.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="mb-4">
             <ol className="flex items-center w-full">
                {steps.map((step, index) => (
                    <li key={step.id} className={cn("flex w-full items-center", { "after:content-[''] after:w-full after:h-1 after:border-b after:border-border after:border-4 after:inline-block": index < steps.length - 1 })}>
                        <span className={cn("flex items-center justify-center w-10 h-10 rounded-full shrink-0", currentStep > step.id ? 'bg-primary text-primary-foreground' : currentStep === step.id ? 'bg-primary/20 border-2 border-primary text-primary' : 'bg-secondary text-secondary-foreground')}>
                            {currentStep > step.id ? <Check /> : step.id}
                        </span>
                    </li>
                ))}
            </ol>
          </div>
          <CardTitle>{steps[currentStep-1].name}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && <Step1Content />}
          {currentStep === 2 && <Step2Content />}
          {currentStep === 3 && <Step3Content />}
          {currentStep === 4 && <Step4Content />}
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button>Finish Onboarding</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

const Step1Content = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <div className="grid gap-2">
      <Label htmlFor="legal-name">Legal Business Name</Label>
      <Input id="legal-name" placeholder="Innovate Inc." />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="ein">EIN</Label>
      <Input id="ein" placeholder="12-3456789" />
    </div>
    <div className="grid gap-2 md:col-span-2">
      <Label htmlFor="address">Business Address</Label>
      <Input id="address" placeholder="123 Main St, San Francisco, CA 94103" />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="fiscal-year">Fiscal Year End</Label>
       <Select>
          <SelectTrigger id="fiscal-year">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dec">December</SelectItem>
            <SelectItem value="mar">March</SelectItem>
            <SelectItem value="jun">June</SelectItem>
            <SelectItem value="sep">September</SelectItem>
          </SelectContent>
        </Select>
    </div>
  </div>
);

const Step2Content = () => (
    <div className="grid gap-6">
        <div className="grid gap-2">
            <Label htmlFor="subscription-tier">Subscription Tier</Label>
            <Select>
                <SelectTrigger id="subscription-tier">
                    <SelectValue placeholder="Select a tier" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div>
            <Label className="font-medium">Optional Add-ons</Label>
            <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                    <Checkbox id="payroll" />
                    <Label htmlFor="payroll" className="font-normal">Payroll Processing</Label>
                </div>
                 <div className="flex items-center gap-2">
                    <Checkbox id="tax" />
                    <Label htmlFor="tax" className="font-normal">Intelligent Tax Filing</Label>
                </div>
                 <div className="flex items-center gap-2">
                    <Checkbox id="advisory" />
                    <Label htmlFor="advisory" className="font-normal">Advanced Advisory Services</Label>
                </div>
            </div>
        </div>
    </div>
);

const Step3Content = () => (
    <div className="grid gap-4">
        <p className="text-muted-foreground">Upload the client's historical financial data. Supported formats: CSV, XLSX, QBO.</p>
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted-foreground">CSV, XLSX, QBO (MAX. 50MB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
        </div> 
    </div>
);

const Step4Content = () => (
    <div className="grid gap-6">
        <div>
            <h3 className="font-medium">Chart of Accounts Setup</h3>
            <p className="text-sm text-muted-foreground">Choose how to set up the client's chart of accounts.</p>
            <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline">Use Standard Template</Button>
                <Button variant="outline">Import from File</Button>
                <Button variant="outline">Configure Manually</Button>
            </div>
        </div>
         <div>
            <h3 className="font-medium">Grant Client Access</h3>
            <p className="text-sm text-muted-foreground">Add client users and assign their roles.</p>
            <div className="mt-4 flex items-end gap-2">
                 <div className="grid gap-2 flex-1">
                    <Label htmlFor="client-email">User Email</Label>
                    <Input id="client-email" type="email" placeholder="client@example.com" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="client-role">Role</Label>
                    <Select>
                        <SelectTrigger id="client-role" className="w-40">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button>Add User</Button>
            </div>
        </div>
    </div>
);
