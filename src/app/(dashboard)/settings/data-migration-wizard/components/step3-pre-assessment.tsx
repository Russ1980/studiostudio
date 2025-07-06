
"use client";

import { CheckCircle, AlertTriangle } from "lucide-react";
import { useMigrationWizard } from "../context/migration-wizard-context";

export function Step3PreAssessment() {
  const { migrationData } = useMigrationWizard();
  
  // This is a placeholder for a real API call that would assess the data source.
  const assessmentResults = {
    "QuickBooks Online": {
      connection: "Success",
      volume: "~15,800 records",
      issues: ["Custom fields will not be migrated."],
    },
    "Xero": {
        connection: "Success",
        volume: "~8,200 records",
        issues: ["Payroll history requires manual entry."],
    },
    "FreshBooks": {
        connection: "Success",
        volume: "~4,500 records",
        issues: ["Journal entries are not supported via API."],
    },
    "FileUpload": {
        connection: "N/A",
        volume: "Depends on file",
        issues: ["File must be in a supported format (CSV, XLSX)."],
    },
     "Database": {
        connection: "Pending",
        volume: "Unknown",
        issues: ["Requires database credentials and firewall access."],
    },
    "default": {
        connection: "Unknown",
        volume: "Unknown",
        issues: ["No data source selected."],
    }
  };

  const results = assessmentResults[migrationData.sourceSystem as keyof typeof assessmentResults] || assessmentResults.default;


  return (
    <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Pre-Assessment</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
            Analyzing your selected source: <span className="font-semibold text-primary">{migrationData.sourceSystem || 'N/A'}</span>. Here is a summary of our initial findings.
        </p>

        <ul className="space-y-3 text-left w-full max-w-md bg-muted/50 p-4 rounded-lg border">
            <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success"/>
                <span>Data Source Connection: <span className="font-semibold">{results.connection}</span></span>
            </li>
             <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success"/>
                <span>Estimated Data Volume: <span className="font-semibold">{results.volume}</span></span>
            </li>
            {results.issues.map((issue, index) => (
                 <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0"/>
                    <span>Potential Issue: <span className="font-semibold">{issue}</span></span>
                </li>
            ))}
             <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success"/>
                <span>Target System Compatibility: <span className="font-semibold">Passed</span></span>
            </li>
        </ul>
        <p className="text-xs text-muted-foreground mt-4 max-w-md">Note: This is a preliminary check. A more detailed validation will occur after data is uploaded or connected.</p>
    </div>
  );
}
