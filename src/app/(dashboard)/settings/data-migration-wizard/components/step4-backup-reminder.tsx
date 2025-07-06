
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DatabaseBackup, FileText, Download } from "lucide-react";
import { useMigrationWizard } from "../context/migration-wizard-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const backupInstructions = {
    "QuickBooks Online": {
        steps: [
            "1. Log in to your QuickBooks Online account.",
            "2. Go to Settings ⚙ and select 'Back up company'.",
            "3. Follow the on-screen prompts to create a new backup.",
            "4. Download the backup file to your computer."
        ],
        image: "https://placehold.co/600x300.png",
        hint: "quickbooks screenshot"
    },
    "Xero": {
        steps: [
            "1. Log in to your Xero account.",
            "2. Go to Accounting > Advanced > Export accounting data.",
            "3. Select all data types and export the file.",
        ],
        image: "https://placehold.co/600x300.png",
        hint: "xero screenshot"
    },
     "FileUpload": {
        steps: [
            "1. Locate your data files (CSV, XLSX) on your computer.",
            "2. We recommend creating a copy of your original files in a safe location before uploading.",
            "3. Ensure the files are not open in any other application.",
        ],
        image: "https://placehold.co/600x300.png",
        hint: "folder screenshot"
    },
    "default": {
        steps: [
            "Please follow the backup instructions provided by your software vendor.",
            "Ensure you have a complete and recent backup file saved locally."
        ],
        image: null,
        hint: null
    }
}


export function Step4BackupReminder() {
  const { migrationData, updateMigrationData } = useMigrationWizard();
  const instructions = backupInstructions[migrationData.sourceSystem as keyof typeof backupInstructions] || backupInstructions.default;

  return (
    <div className="text-center flex flex-col items-center">
        <DatabaseBackup className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Backup Your Data</h2>
        <p className="text-muted-foreground max-w-3xl mb-8">
            Before proceeding, we strongly recommend you create a full backup of your existing data from <span className="font-semibold text-primary">{migrationData.sourceSystem}</span>. While our process is safe, this is a crucial best practice.
        </p>

        <Card className="w-full max-w-3xl text-left">
            <CardHeader>
                <CardTitle>Backup Instructions for {migrationData.sourceSystem}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {instructions.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <span className="font-semibold text-primary">{index + 1}.</span>
                            <span>{step}</span>
                        </li>
                    ))}
                </ul>

                {instructions.image && (
                    <div>
                        <p className="font-semibold mb-2">Example:</p>
                        <div className="border rounded-lg overflow-hidden">
                           <Image src={instructions.image} alt="Backup process screenshot" width={600} height={300} data-ai-hint={instructions.hint || ''} />
                        </div>
                    </div>
                )}
                 <div className="flex items-center space-x-2 p-4 border rounded-lg justify-center bg-secondary">
                    <Checkbox 
                        id="backup-confirmed" 
                        checked={migrationData.backupConfirmed}
                        onCheckedChange={(checked) => updateMigrationData({ backupConfirmed: !!checked })}
                    />
                    <Label htmlFor="backup-confirmed" className="font-semibold text-base">I have created and secured a backup of my data.</Label>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
