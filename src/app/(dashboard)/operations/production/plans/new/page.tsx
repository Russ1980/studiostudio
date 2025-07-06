
"use client";

import { useRouter } from 'next/navigation';
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
import { Textarea } from '@/components/ui/textarea';
import { FileStack, Route } from 'lucide-react';

export default function NewProductionPlanPage() {
  const router = useRouter();

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <div>
        <h1 className="text-3xl font-bold">Create Production Plan</h1>
        <p className="text-muted-foreground">
          Define what, when, and how much to produce.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
          <CardDescription>Enter the core details for this production run.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
                <Label htmlFor="plan-id">Plan ID</Label>
                <Input id="plan-id" defaultValue="PP-005" disabled />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="e.g., Widget A" />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="e.g., 1000" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
            </div>
             <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add any relevant notes for this production plan..." />
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Bill of Materials (BOM)</CardTitle>
                <CardDescription>Specify the required components for this plan.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center border-dashed border rounded-lg p-8 h-48">
                <FileStack className="h-10 w-10 text-muted-foreground"/>
                <p className="text-sm text-muted-foreground">BOM functionality coming soon.</p>
                <Button variant="outline">Select BOM</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Routing</CardTitle>
                <CardDescription>Define the sequence of operations.</CardDescription>
            </CardHeader>
             <CardContent className="flex flex-col items-center justify-center gap-4 text-center border-dashed border rounded-lg p-8 h-48">
                <Route className="h-10 w-10 text-muted-foreground"/>
                <p className="text-sm text-muted-foreground">Routing definition coming soon.</p>
                <Button variant="outline">Define Routing</Button>
            </CardContent>
        </Card>
      </div>

       <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit">Save Production Plan</Button>
       </div>
    </form>
  );
}
