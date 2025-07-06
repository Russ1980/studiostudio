
'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { migrateTransactionData } from '@/lib/migration';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function MigrationCard() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleMigrate = () => {
        startTransition(async () => {
            toast({
                title: 'Migration Started',
                description: 'Migrating transaction data from Supabase to Firebase...',
            });

            const result = await migrateTransactionData();

            if (result.success) {
                toast({
                    title: 'Migration Successful',
                    description: `Successfully migrated ${result.migrated} transactions.`,
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
        <Card>
            <CardHeader>
                <CardTitle>Data Migration</CardTitle>
                <CardDescription>
                    Migrate data from legacy systems (e.g., Supabase) to Firebase.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleMigrate} disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Migrate Transaction Data
                </Button>
            </CardContent>
        </Card>
    );
}
