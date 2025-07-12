
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from 'next/link';
import { Database, ArrowRight, Wand } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DataMigrationWizardPage from "../data-migration-wizard/page";


export default function DataManagementSettingsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Management Hub</CardTitle>
          <CardDescription>
            Access tools for data import/export, backups, and large-scale migrations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            All data management tools are centralized in the Data Management dashboard.
          </p>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button asChild>
            <Link href="/data-management">
              Go to Data Management Dashboard <ArrowRight className="ml-2"/>
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Data Migration Wizard</CardTitle>
          <CardDescription>
            A step-by-step guide to migrate your data from other platforms like QuickBooks or Xero into Mardisen Suite.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This guided process ensures data integrity and a seamless transition.</p>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <Wand className="mr-2"/> Launch Migration Wizard
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl">
                    <DataMigrationWizardPage />
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
