
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
export default function NewJobPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Create Job</h1>
        <p className="text-muted-foreground">
          Set up a new job to track costs and profitability.
        </p>
      </div>

      <Card>
        <form onSubmit={(e) => e.preventDefault()}>
            <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Enter the core details for this job or project.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="job-name">Job Name</Label>
                    <Input id="job-name" placeholder="e.g., Retail Store Renovation" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Select>
                        <SelectTrigger id="customer">
                            <SelectValue placeholder="Select a customer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="customer-a">Innovate Inc.</SelectItem>
                            <SelectItem value="customer-b">Apex Solutions</SelectItem>
                            <SelectItem value="customer-c">QuantumLeap Co.</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="end-date">Projected End Date</Label>
                    <Input id="end-date" type="date" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input id="budget" type="number" placeholder="$0.00" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="job-type">Job Type</Label>
                     <Select>
                        <SelectTrigger id="job-type">
                            <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="service">Service</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="notes">Description / Notes</Label>
                    <Textarea id="notes" placeholder="Add any relevant notes for this job..." />
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">Save Job</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
