
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
import { Database, ArrowRight } from "lucide-react";

export default function DataManagementSettingsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Management Settings</CardTitle>
          <CardDescription>
            Configure and access tools for data migration, import/export, and backups.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            All data management tools, including the Supabase to Firebase data migration utility, are centralized in the Data Management dashboard.
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
    </div>
  );
}
