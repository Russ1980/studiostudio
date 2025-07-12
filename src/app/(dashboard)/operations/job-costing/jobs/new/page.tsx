"use client";

import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { addNewJob } from "@/lib/actions";
  
const JobSchema = z.object({
  name: z.string().min(1, 'Job name is required'),
  customer: z.string().min(1, 'Customer is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  budget: z.coerce.number().positive('Budget must be a positive number'),
  jobType: z.string().min(1, 'Job type is required'),
  description: z.string().optional(),
});

export default function NewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
        name: "",
        customer: "",
        startDate: "",
        endDate: "",
        budget: 0,
        jobType: "",
        description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof JobSchema>) => {
    startTransition(async () => {
        const result = await addNewJob(values);
        if (result.success) {
            toast({ title: "Job Created", description: `Job "${values.name}" has been successfully created.` });
            router.push("/operations/job-costing/jobs");
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Create Job</h1>
        <p className="text-muted-foreground">
          Set up a new job to track costs and profitability.
        </p>
      </div>

       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <Card>
                <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Enter the core details for this job or project.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem className="grid gap-2"><FormLabel>Job Name</FormLabel><FormControl><Input placeholder="e.g., Retail Store Renovation" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="customer" render={({ field }) => (
                        <FormItem className="grid gap-2">
                            <FormLabel>Customer</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a customer" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="Innovate Inc.">Innovate Inc.</SelectItem>
                                    <SelectItem value="Apex Solutions">Apex Solutions</SelectItem>
                                    <SelectItem value="QuantumLeap Co.">QuantumLeap Co.</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="startDate" render={({ field }) => (
                        <FormItem className="grid gap-2"><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="endDate" render={({ field }) => (
                        <FormItem className="grid gap-2"><FormLabel>Projected End Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="budget" render={({ field }) => (
                        <FormItem className="grid gap-2"><FormLabel>Budget</FormLabel><FormControl><Input type="number" placeholder="$0.00" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="jobType" render={({ field }) => (
                        <FormItem className="grid gap-2">
                            <FormLabel>Job Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select job type" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="Construction">Construction</SelectItem>
                                    <SelectItem value="Consulting">Consulting</SelectItem>
                                    <SelectItem value="Service">Service</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem className="grid gap-2 md:col-span-2"><FormLabel>Description / Notes</FormLabel><FormControl><Textarea placeholder="Add any relevant notes for this job..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </CardContent>
                <CardFooter className="border-t pt-6 flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 animate-spin" />}
                        Save Job
                    </Button>
                </CardFooter>
            </Card>
        </form>
      </Form>
    </div>
  );
}
