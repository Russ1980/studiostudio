"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function InvoicingSettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Invoicing Settings</h1>
        <p className="text-muted-foreground">
          Configure default behaviors for the entire Invoicing module.
        </p>
      </div>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General Defaults</TabsTrigger>
          <TabsTrigger value="automation">Numbering & Automation</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
                <CardTitle>General Defaults</CardTitle>
                <CardDescription>Set default payment terms and late fee policies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2 max-w-sm">
                    <Label htmlFor="default-terms">Default Payment Terms</Label>
                    <Input id="default-terms" defaultValue="Net 30" />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="late-fees"/>
                    <Label htmlFor="late-fees">Automatically apply late fees</Label>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="automation" className="mt-4">
           <Card>
            <CardHeader>
                <CardTitle>Numbering & Automation</CardTitle>
                <CardDescription>Customize invoice number sequences and configure automatic reminders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2 max-w-sm">
                    <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                    <Input id="invoice-prefix" defaultValue="INV-" />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="reminders" defaultChecked/>
                    <Label htmlFor="reminders">Send automatic payment reminders for overdue invoices</Label>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
           <Card>
            <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Edit the default text for emails sent with invoices, reminders, and payment receipts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="invoice-email">Invoice Email Body</Label>
                    <Textarea id="invoice-email" className="min-h-32" defaultValue="Hi [Customer Name], here is your invoice #[Invoice Number] for [Amount]. Thank you for your business!" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="reminder-email">Reminder Email Body</Label>
                    <Textarea id="reminder-email" className="min-h-32" defaultValue="Hi [Customer Name], this is a friendly reminder that invoice #[Invoice Number] for [Amount] is due on [Due Date]." />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save Templates</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
