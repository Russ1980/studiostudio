
'use client';

import React, { useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { migrateClientData, migrateInvoiceData, migrateEmployeeData, migrateJobData, migrateTaxFilings, migrateTaxPayments, migrateBankAccounts, migrateTaskData, migrateChartOfAccounts, migrateTimeLogs, migrateJournalEntries } from '@/lib/migration';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function MigrationButton({ 
    migrationFn, 
    label,
    description,
}: { 
    migrationFn: () => Promise<{ success: boolean; migrated?: number; error?: string; }>; 
    label: string;
    description: string;
}) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleMigrate = () => {
        startTransition(async () => {
            toast({
                title: 'Migration Started',
                description: `Migrating ${description}...`,
            });

            const result = await migrationFn();

            if (result.success) {
                toast({
                    title: 'Migration Successful',
                    description: `Successfully migrated ${result.migrated} ${description}.`,
                });
            } else {
                toast({
                    title: 'Migration Failed',
                    description: result.error || 'An unknown error occurred.',
                    variant: 'destructive',
                });
            }
        });
    };

    return (
        <Button onClick={handleMigrate} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {label}
        </Button>
    );
}

export function MigrationCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Data Migration to Firebase</CardTitle>
                <CardDescription>
                    Select a data type to migrate from mock data to your live Firebase Firestore database.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <MigrationButton migrationFn={migrateClientData} label="Migrate Clients" description="client data" />
                <MigrationButton migrationFn={migrateInvoiceData} label="Migrate Invoices" description="invoice data" />
                <MigrationButton migrationFn={migrateEmployeeData} label="Migrate Employees" description="employee data" />
                <MigrationButton migrationFn={migrateJobData} label="Migrate Jobs" description="job data" />
                <MigrationButton migrationFn={migrateTaxFilings} label="Migrate Tax Filings" description="tax filing data" />
                <MigrationButton migrationFn={migrateTaxPayments} label="Migrate Tax Payments" description="tax payment data" />
                <MigrationButton migrationFn={migrateBankAccounts} label="Migrate Bank Accounts" description="bank account data" />
                <MigrationButton migrationFn={migrateTaskData} label="Migrate Tasks" description="task data" />
                <MigrationButton migrationFn={migrateChartOfAccounts} label="Migrate Chart of Accounts" description="chart of accounts data" />
                <MigrationButton migrationFn={migrateTimeLogs} label="Migrate Time Logs" description="time log data" />
                <MigrationButton migrationFn={migrateJournalEntries} label="Migrate Journal Entries" description="journal entry data" />
            </CardContent>
        </Card>
    );
}
