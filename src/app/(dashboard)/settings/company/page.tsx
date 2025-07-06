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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import Image from "next/image";

export default function CompanySettingsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Settings</CardTitle>
          <CardDescription>
            Manage the global information for your organization. This data appears on official documents like invoices and reports.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
           <div className="flex items-center gap-4">
                <Image src="https://placehold.co/80x80.png" alt="Company Logo" width={80} height={80} className="rounded-md" data-ai-hint="company logo" />
                <Button variant="outline"><Upload className="mr-2" /> Upload New Logo</Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="legal-name">Legal Business Name</Label>
                    <Input id="legal-name" defaultValue="Mardisen Suite Inc." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="tax-id">Tax ID (EIN)</Label>
                    <Input id="tax-id" defaultValue="12-3456789" />
                </div>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="address">Company Address</Label>
                <Textarea id="address" defaultValue="123 Business Rd, Suite 100, Business City, 54321" />
            </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
