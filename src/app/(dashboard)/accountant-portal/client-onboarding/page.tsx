
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
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
import { Upload, Check, FileText, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Client Profile" },
  { id: 2, name: "Subscription" },
  { id: 3, name: "Data Migration" },
  { id: 4, name: "Configuration & Access" },
];

type ClientUser = {
    email: string;
    role: string;
}

type OnboardingData = {
    legalName: string;
    ein: string;
    address: string;
    fiscalYear: string;
    subscriptionTier: string;
    payrollAddon: boolean;
    taxAddon: boolean;
    advisoryAddon: boolean;
    uploadedFile: File | null;
    chartOfAccountsSetup: string;
    clientUsers: ClientUser[];
}

export default function ClientOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
      legalName: '',
      ein: '',
      address: '',
      fiscalYear: '',
      subscriptionTier: '',
      payrollAddon: false,
      taxAddon: false,
      advisoryAddon: false,
      uploadedFile: null,
      chartOfAccountsSetup: '',
      clientUsers: [],
  });
  
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('');

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

  const updateFormData = (updates: Partial<OnboardingData>) => {
      setFormData(prev => ({...prev, ...updates}));
  }

  const handleAddUser = () => {
      if(newUserEmail && newUserRole) {
          updateFormData({
              clientUsers: [...formData.clientUsers, {email: newUserEmail, role: newUserRole}]
          });
          setNewUserEmail('');
          setNewUserRole('');
      }
  }

  const handleRemoveUser = (emailToRemove: string) => {
      updateFormData({
          clientUsers: formData.clientUsers.filter(user => user.email !== emailToRemove)
      });
  }

  const CurrentStepComponent = () => {
    switch(currentStep) {
        case 1: return <Step1Content formData={formData} updateFormData={updateFormData} />;
        case 2: return <Step2Content formData={formData} updateFormData={updateFormData} />;
        case 3: return <Step3Content formData={formData} updateFormData={updateFormData} />;
        case 4: return (
            <Step4Content 
                formData={formData} 
                updateFormData={updateFormData} 
                newUserEmail={newUserEmail}
                setNewUserEmail={setNewUserEmail}
                newUserRole={newUserRole}
                setNewUserRole={setNewUserRole}
                handleAddUser={handleAddUser}
                handleRemoveUser={handleRemoveUser}
            />
        );
        default: return null;
    }
  }

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
          <CurrentStepComponent />
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

const Step1Content = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (d: Partial<OnboardingData>) => void }) => (
  <div className="grid gap-4 md:grid-cols-2">
    <div className="grid gap-2">
      <Label htmlFor="legal-name">Legal Business Name</Label>
      <Input id="legal-name" placeholder="Innovate Inc." value={formData.legalName} onChange={e => updateFormData({ legalName: e.target.value })} />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="ein">EIN</Label>
      <Input id="ein" placeholder="12-3456789" value={formData.ein} onChange={e => updateFormData({ ein: e.target.value })} />
    </div>
    <div className="grid gap-2 md:col-span-2">
      <Label htmlFor="address">Business Address</Label>
      <Input id="address" placeholder="123 Main St, San Francisco, CA 94103" value={formData.address} onChange={e => updateFormData({ address: e.target.value })} />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="fiscal-year">Fiscal Year End</Label>
       <Select value={formData.fiscalYear} onValueChange={value => updateFormData({ fiscalYear: value })}>
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

const Step2Content = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (d: Partial<OnboardingData>) => void }) => (
    <div className="grid gap-6">
        <div className="grid gap-2">
            <Label htmlFor="subscription-tier">Subscription Tier</Label>
            <Select value={formData.subscriptionTier} onValueChange={value => updateFormData({ subscriptionTier: value })}>
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
                    <Checkbox id="payroll" checked={formData.payrollAddon} onCheckedChange={checked => updateFormData({ payrollAddon: !!checked })} />
                    <Label htmlFor="payroll" className="font-normal">Payroll Processing</Label>
                </div>
                 <div className="flex items-center gap-2">
                    <Checkbox id="tax" checked={formData.taxAddon} onCheckedChange={checked => updateFormData({ taxAddon: !!checked })} />
                    <Label htmlFor="tax" className="font-normal">Intelligent Tax Filing</Label>
                </div>
                 <div className="flex items-center gap-2">
                    <Checkbox id="advisory" checked={formData.advisoryAddon} onCheckedChange={checked => updateFormData({ advisoryAddon: !!checked })} />
                    <Label htmlFor="advisory" className="font-normal">Advanced Advisory Services</Label>
                </div>
            </div>
        </div>
    </div>
);

const Step3Content = ({ formData, updateFormData }: { formData: OnboardingData, updateFormData: (d: Partial<OnboardingData>) => void }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            updateFormData({ uploadedFile: acceptedFiles[0] });
        }
    }, [updateFormData]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

    return (
        <div className="grid gap-4">
            <p className="text-muted-foreground">Upload the client's historical financial data. Supported formats: CSV, XLSX, QBO.</p>
            <div
                {...getRootProps()}
                className={cn(
                    "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary transition-colors",
                    isDragActive ? "border-primary bg-primary/10" : "hover:bg-muted"
                )}
            >
                <input {...getInputProps()} />
                {formData.uploadedFile ? (
                     <div className="text-center">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-success" />
                        <p className="font-semibold">{formData.uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">File uploaded successfully.</p>
                        <Button variant="link" className="text-destructive text-xs" onClick={(e) => {e.stopPropagation(); updateFormData({ uploadedFile: null })}}>Remove file</Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">CSV, XLSX, QBO (MAX. 50MB)</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Step4Content = ({ formData, updateFormData, newUserEmail, setNewUserEmail, newUserRole, setNewUserRole, handleAddUser, handleRemoveUser }: { 
    formData: OnboardingData, 
    updateFormData: (d: Partial<OnboardingData>) => void,
    newUserEmail: string,
    setNewUserEmail: (v: string) => void,
    newUserRole: string,
    setNewUserRole: (v: string) => void,
    handleAddUser: () => void,
    handleRemoveUser: (email: string) => void,
}) => (
    <div className="grid gap-6">
        <div>
            <h3 className="font-medium">Chart of Accounts Setup</h3>
            <p className="text-sm text-muted-foreground">Choose how to set up the client's chart of accounts.</p>
            <div className="mt-4 flex flex-wrap gap-2">
                <Button variant={formData.chartOfAccountsSetup === 'standard' ? 'default' : 'outline'} onClick={() => updateFormData({ chartOfAccountsSetup: 'standard' })}>Use Standard Template</Button>
                <Button variant={formData.chartOfAccountsSetup === 'import' ? 'default' : 'outline'} onClick={() => updateFormData({ chartOfAccountsSetup: 'import' })}>Import from File</Button>
                <Button variant={formData.chartOfAccountsSetup === 'manual' ? 'default' : 'outline'} onClick={() => updateFormData({ chartOfAccountsSetup: 'manual' })}>Configure Manually</Button>
            </div>
        </div>
         <div>
            <h3 className="font-medium">Grant Client Access</h3>
            <p className="text-sm text-muted-foreground">Add client users and assign their roles.</p>
            <div className="mt-4 flex items-end gap-2">
                 <div className="grid gap-2 flex-1">
                    <Label htmlFor="client-email">User Email</Label>
                    <Input id="client-email" type="email" placeholder="client@example.com" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="client-role">Role</Label>
                    <Select value={newUserRole} onValueChange={setNewUserRole}>
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
                <Button onClick={handleAddUser}>Add User</Button>
            </div>
            <div className="mt-4 space-y-2">
                {formData.clientUsers.map(user => (
                    <div key={user.email} className="flex items-center justify-between p-2 border rounded-lg">
                        <div>
                            <p className="text-sm font-medium">{user.email}</p>
                            <p className="text-xs text-muted-foreground">{user.role}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveUser(user.email)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
