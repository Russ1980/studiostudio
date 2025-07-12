
"use client";

import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { addNewJournalEntry } from "@/lib/actions";
import React from "react";

const LineItemSchema = z.object({
    account: z.string().min(1, "Required"),
    debit: z.coerce.number().optional(),
    credit: z.coerce.number().optional(),
    description: z.string().optional(),
});

const JournalEntrySchema = z.object({
    date: z.string().min(1, "Date is required"),
    entryNo: z.string().min(1, "Entry No. is required"),
    ref: z.string().optional(),
    lineItems: z.array(LineItemSchema).min(2, "At least two line items are required"),
}).refine(data => {
    const totalDebits = data.lineItems.reduce((acc, item) => acc + (item.debit || 0), 0);
    const totalCredits = data.lineItems.reduce((acc, item) => acc + (item.credit || 0), 0);
    return Math.abs(totalDebits - totalCredits) < 0.001; // Allow for floating point inaccuracies
}, {
    message: "Total debits must equal total credits.",
    path: ["lineItems"],
});


function Totals({ control }: { control: any }) {
    const lineItems = useWatch({ control, name: 'lineItems' });
    const totalDebits = lineItems.reduce((acc: number, item: any) => acc + (item.debit || 0), 0);
    const totalCredits = lineItems.reduce((acc: number, item: any) => acc + (item.credit || 0), 0);
    const isBalanced = Math.abs(totalDebits - totalCredits) < 0.001;

    return (
        <div className="w-1/2 ml-auto mt-4 pr-16">
             <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Totals</span>
                <div className="flex gap-12">
                    <span className={!isBalanced ? "text-destructive" : ""}>${totalDebits.toFixed(2)}</span>
                    <span className={!isBalanced ? "text-destructive" : ""}>${totalCredits.toFixed(2)}</span>
                </div>
             </div>
        </div>
    )
}

export default function NewJournalEntryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof JournalEntrySchema>>({
    resolver: zodResolver(JournalEntrySchema),
    defaultValues: {
        date: new Date().toISOString().substring(0, 10),
        entryNo: `JE-${Date.now().toString().slice(-6)}`,
        ref: "",
        lineItems: [
            { account: "", debit: 0, credit: 0, description: ""},
            { account: "", debit: 0, credit: 0, description: ""},
        ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  const onSubmit = (values: z.infer<typeof JournalEntrySchema>) => {
    startTransition(async () => {
        const result = await addNewJournalEntry(values);
        if (result.success) {
            toast({ title: "Journal Entry Posted", description: `Entry ${values.entryNo} has been created.` });
            router.push('/accounting/journal-entries');
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
            <h1 className="text-3xl font-bold">New Journal Entry</h1>
            <p className="text-muted-foreground">
            Create a new manual entry for the general ledger. Debits must equal credits.
            </p>
        </div>

        <Card>
            <CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="date" render={({ field }) => (
                     <FormItem><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="entryNo" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder="Entry No." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="ref" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder="Reference (optional)" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-2/5">Account</TableHead>
                    <TableHead>Debits</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead className="w-2/5">Description</TableHead>
                    <TableHead className="w-12"></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {fields.map((field, index) => (
                    <TableRow key={field.id}>
                        <TableCell><FormField control={form.control} name={`lineItems.${index}.account`} render={({ field }) => (<FormItem><FormControl><Input placeholder="Select account" {...field} /></FormControl><FormMessage /></FormItem>)}/></TableCell>
                        <TableCell><FormField control={form.control} name={`lineItems.${index}.debit`} render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="$0.00" {...field} /></FormControl><FormMessage /></FormItem>)}/></TableCell>
                        <TableCell><FormField control={form.control} name={`lineItems.${index}.credit`} render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="$0.00" {...field} /></FormControl><FormMessage /></FormItem>)}/></TableCell>
                        <TableCell><FormField control={form.control} name={`lineItems.${index}.description`} render={({ field }) => (<FormItem><FormControl><Input placeholder="Line description" {...field} /></FormControl><FormMessage /></FormItem>)}/></TableCell>
                        <TableCell><Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-muted-foreground"/></Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({ account: "", debit: 0, credit: 0, description: "" })}>
                <PlusCircle className="mr-2 h-4 w-4"/>Add Line
            </Button>
            <Totals control={form.control} />
             {form.formState.errors.lineItems && (
                <p className="text-sm font-medium text-destructive text-right mt-2 pr-16">{form.formState.errors.lineItems.message}</p>
            )}

            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-6">
            <Button variant="outline" type="button" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 animate-spin" />}
                Save and Post
            </Button>
            </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
