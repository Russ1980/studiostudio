
"use client";

import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { updateInvoice } from "@/lib/actions";
import React from "react";

const LineItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.coerce.number().min(0.01, 'Quantity must be positive'),
  rate: z.coerce.number().min(0, 'Rate cannot be negative'),
});

const InvoiceSchema = z.object({
  id: z.string(),
  customer: z.string().min(1, 'Customer is required'),
  invoiceDate: z.string().min(1, 'Invoice date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  lineItems: z.array(LineItemSchema).min(1, 'At least one line item is required'),
  notes: z.string().optional(),
});

function InvoiceTotal({ control }: { control: any }) {
    const lineItems = useFieldArray({ control, name: 'lineItems' });

    const subtotal = React.useMemo(() => {
        return lineItems.fields.reduce((acc, item, index) => {
            const quantity = control.getValues(`lineItems.${index}.quantity`) || 0;
            const rate = control.getValues(`lineItems.${index}.rate`) || 0;
            return acc + quantity * rate;
        }, 0);
    }, [lineItems.fields, control]);
    
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="w-1/3 ml-auto mt-6 space-y-2">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
    )
}

export function EditInvoiceForm({ invoice, clients }: { invoice: any, clients: any[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      customer: invoice.customer,
      // This is simplified. A real app would need to parse line items from the invoice object
      lineItems: [{ description: "Service from invoice", quantity: 1, rate: parseFloat(invoice.amount) / 1.08 }],
      notes: invoice.notes || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  const onSubmit = (values: z.infer<typeof InvoiceSchema>) => {
    startTransition(async () => {
      const result = await updateInvoice(values);
      if (result.success) {
        toast({ title: "Invoice Updated", description: `Invoice ${values.invoiceNumber} has been successfully updated.` });
        router.push("/invoicing/invoices");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Card>
          <CardHeader className="grid grid-cols-2 gap-6">
              <div><h2 className="text-xl font-bold">Your Company Inc.</h2></div>
              <div className="grid grid-cols-2 gap-4 ml-auto text-right">
                  <FormField control={form.control} name="invoiceNumber" render={({ field }) => (
                      <FormItem className="grid gap-2"><FormLabel>Invoice #</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="invoiceDate" render={({ field }) => (
                      <FormItem className="grid gap-2"><FormLabel>Invoice Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
              </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField control={form.control} name="customer" render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Bill To</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {clients.map(client => (
                            <SelectItem key={client.id} value={client.businessName}>{client.businessName}</SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4 ml-auto">
                   <div className="grid gap-2"><Label>Terms</Label><Input defaultValue="Net 30" /></div>
                   <FormField control={form.control} name="dueDate" render={({ field }) => (
                      <FormItem className="grid gap-2"><FormLabel>Due Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
              </div>
            </div>
            <Table className="mt-6">
              <TableHeader><TableRow><TableHead>Item</TableHead><TableHead>Qty</TableHead><TableHead>Rate</TableHead><TableHead className="text-right">Amount</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell><FormField control={form.control} name={`lineItems.${index}.description`} render={({ field }) => (<FormItem><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)}/></TableCell>
                      <TableCell><FormField control={form.control} name={`lineItems.${index}.quantity`} render={({ field }) => (<FormItem><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)}/></TableCell>
                      <TableCell><FormField control={form.control} name={`lineItems.${index}.rate`} render={({ field }) => (<FormItem><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)}/></TableCell>
                      <TableCell className="text-right">${(form.watch(`lineItems.${index}.quantity`) * form.watch(`lineItems.${index}.rate`)).toFixed(2)}</TableCell>
                      <TableCell><Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2/></Button></TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({ description: "", quantity: 1, rate: 0 })}><PlusCircle className="mr-2 h-4 w-4"/>Add Line</Button>
            <InvoiceTotal control={form.control} />
            <div className="mt-8"><FormField control={form.control} name="notes" render={({ field }) => (<FormItem><FormLabel>Notes</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-6">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
            <Button type="submit" disabled={isPending}>{isPending && <Loader2 className="mr-2 animate-spin" />}Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
