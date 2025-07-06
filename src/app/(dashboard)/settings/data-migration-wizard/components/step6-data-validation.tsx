
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileCheck, FileWarning, FileX, ShieldCheck } from "lucide-react";
import { useMigrationWizard } from "../context/migration-wizard-context";
import { Button } from '@/components/ui/button';

const validationIssues = [
    { row: 15, field: 'transaction_date', issue: 'Invalid date format. Expected YYYY-MM-DD.', severity: 'Error' },
    { row: 28, field: 'amount', issue: 'Non-numeric characters found.', severity: 'Error' },
    { row: 42, field: 'customer_name', issue: 'Field is empty but required.', severity: 'Error' },
    { row: 55, field: 'notes', issue: 'Field exceeds maximum length of 255 characters.', severity: 'Warning' },
    { row: 89, field: 'invoice_id', issue: 'Referenced invoice does not exist.', severity: 'Error' },
];

const severityVariant: { [key: string]: 'destructive' | 'default' } = {
  Error: 'destructive',
  Warning: 'default',
};

export function Step6DataValidation() {
    const { migrationData, updateMigrationData } = useMigrationWizard();
    const [isValidating, setIsValidating] = useState(true);
    const [results, setResults] = useState<{valid: number, warnings: number, errors: number} | null>(null);

    useEffect(() => {
        // Reset state when component mounts or file changes
        setIsValidating(true);
        setResults(null);
        updateMigrationData({ validationResults: null });

        const timer = setTimeout(() => {
            const newResults = {
                valid: 10415,
                warnings: 35,
                errors: 15,
            };
            setResults(newResults);
            updateMigrationData({ validationResults: newResults });
            setIsValidating(false);
        }, 2500); // Simulate validation time

        return () => clearTimeout(timer);
    }, [migrationData.uploadedFile, updateMigrationData]);

    if (isValidating) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                <h2 className="text-2xl font-bold mb-2">Validating Data...</h2>
                <p className="text-muted-foreground max-w-md">
                    Scanning <span className="font-semibold text-primary">{migrationData.uploadedFile?.name || 'your file'}</span> for errors and inconsistencies. This may take a moment.
                </p>
            </div>
        );
    }

    if (!results) return null;

    return (
        <div className="text-center flex flex-col items-center">
            <ShieldCheck className="w-16 h-16 text-success mb-4" />
            <h2 className="text-2xl font-bold mb-2">Validation Complete</h2>
            <p className="text-muted-foreground max-w-2xl mb-8">
                We've scanned your files for issues. Errors must be fixed before proceeding, while warnings are optional. You can upload a new file or try to proceed if there are no errors.
            </p>

            <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valid Records</CardTitle>
                        <FileCheck className="h-4 w-4 text-success" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{results.valid.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                        <FileWarning className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{results.warnings.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Errors</CardTitle>
                        <FileX className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{results.errors.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>
            
             <Card className="w-full max-w-4xl text-left">
                <CardHeader>
                    <CardTitle>Issues Found</CardTitle>
                    <CardDescription>A sample of issues that need your attention. You can download the full report to see all issues.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Row #</TableHead>
                                <TableHead>Field</TableHead>
                                <TableHead>Issue</TableHead>
                                <TableHead>Severity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {validationIssues.map((issue, index) => (
                                <TableRow key={index}>
                                    <TableCell>{issue.row}</TableCell>
                                    <TableCell className="font-mono">{issue.field}</TableCell>
                                    <TableCell>{issue.issue}</TableCell>
                                    <TableCell>
                                        <Badge variant={severityVariant[issue.severity]}>{issue.severity}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button variant="outline">Download Full Report</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
