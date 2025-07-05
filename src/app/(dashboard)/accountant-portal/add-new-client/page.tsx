"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { Loader2 } from "lucide-react";

export default function AddNewClientPage() {
  const router = useRouter();
  const [isSaving, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      // Simulate a save operation
      return new Promise((resolve) => setTimeout(resolve, 1500));
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Add New Client</h1>
          <p className="text-muted-foreground">
            Fill out the form below to create a new client profile.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Provide the legal and tax information for the business.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" placeholder="e.g., Innovate Inc." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="business-type">Business Type</Label>
            <Select>
              <SelectTrigger id="business-type">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="llc">LLC</SelectItem>
                <SelectItem value="s-corp">S-Corp</SelectItem>
                <SelectItem value="c-corp">C-Corp</SelectItem>
                <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ein">EIN / Tax ID</Label>
            <Input id="ein" placeholder="e.g., 12-3456789" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" placeholder="e.g., Technology" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Primary Contact</CardTitle>
          <CardDescription>
            The main point of contact for this client.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="contact-name">Contact Name</Label>
            <Input id="contact-name" placeholder="e.g., Jane Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input id="contact-email" type="email" placeholder="e.g., jane.doe@innovate.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-phone">Contact Phone</Label>
            <Input id="contact-phone" type="tel" placeholder="e.g., (555) 123-4567" />
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>
            The physical address of the business.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="street-address">Street Address</Label>
            <Input id="street-address" placeholder="e.g., 123 Main St" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="e.g., San Francisco" />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="e.g., CA" />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" placeholder="e.g., 94103" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
            <Button variant="outline" onClick={() => router.back()} disabled={isSaving}>Cancel</Button>
            <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 animate-spin" />}
                Save Client
            </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
