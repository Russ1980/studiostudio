
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateClient } from "@/lib/actions";

const ClientSchema = z.object({
    id: z.string(),
    businessName: z.string().min(1, 'Business name is required'),
    businessType: z.string().min(1, 'Business type is required'),
    ein: z.string().optional(),
    industry: z.string().optional(),
    contactName: z.string().min(1, 'Contact name is required'),
    contactEmail: z.string().email('Invalid email address'),
    contactPhone: z.string().optional(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    status: z.enum(["Active", "Onboarding", "Inactive"]),
});

type ClientFormValues = z.infer<typeof ClientSchema>;

export function EditClientForm({ client }: { client: ClientFormValues }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(ClientSchema),
    defaultValues: client,
  });

  const onSubmit = (values: ClientFormValues) => {
    startTransition(async () => {
      const result = await updateClient(values);
      if (result.success) {
        toast({ title: "Client Updated", description: `${values.businessName} has been successfully updated.` });
        router.push("/accountant-portal/client-list");
        router.refresh();
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <Card>
            <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
                Provide the legal and tax information for the business.
            </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="businessName" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Business Name</FormLabel><FormControl><Input placeholder="e.g., Innovate Inc." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="businessType" render={({ field }) => (
                    <FormItem className="grid gap-2">
                        <FormLabel>Business Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select business type" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="llc">LLC</SelectItem>
                                <SelectItem value="s-corp">S-Corp</SelectItem>
                                <SelectItem value="c-corp">C-Corp</SelectItem>
                                <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="ein" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>EIN / Tax ID</FormLabel><FormControl><Input placeholder="e.g., 12-3456789" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="industry" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g., Technology" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem className="grid gap-2">
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Onboarding">Onboarding</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
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
                 <FormField control={form.control} name="contactName" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Contact Name</FormLabel><FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="contactEmail" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" placeholder="e.g., jane.doe@innovate.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="contactPhone" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Contact Phone</FormLabel><FormControl><Input type="tel" placeholder="e.g., (555) 123-4567" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
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
                <FormField control={form.control} name="streetAddress" render={({ field }) => (
                    <FormItem className="grid gap-2 md:col-span-2"><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="e.g., 123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>City</FormLabel><FormControl><Input placeholder="e.g., San Francisco" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>State</FormLabel><FormControl><Input placeholder="e.g., CA" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="zip" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>ZIP Code</FormLabel><FormControl><Input placeholder="e.g., 94103" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 animate-spin" />}
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
        </form>
    </Form>
  );
}
