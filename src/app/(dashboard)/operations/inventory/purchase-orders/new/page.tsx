"use client";

import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from "react-hook-form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { addNewPurchaseOrder } from "@/lib/actions";

const LineItemSchema = z.object({
  item: z.string().min(1, 'Item is required'),
  description: z.string().optional(),
  quantity: z.coerce.number().min(1, 'Quantity must be positive'),
  unitCost: z.coerce.number().min(0, 'Cost cannot be negative'),
});

const PurchaseOrderSchema = z.object({
  vendor: z.string().min(1, 'Vendor is required'),
  location: z.string().min(1, 'Location is required'),
  deliveryDate: z.string().min(1, 'Delivery date is required'),
  lineItems: z.array(LineItemSchema).min(1, 'At least one line item is required'),
});

export default function NewPurchaseOrderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<z.infer<typeof PurchaseOrderSchema>>({
    resolver: zodResolver(PurchaseOrderSchema),
    defaultValues: {
      vendor: "",
      location: "",
      deliveryDate: "",
      lineItems: [{ item: "", description: "", quantity: 1, unitCost: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  const onSubmit = (values: z.infer<typeof PurchaseOrderSchema>) => {
    startTransition(async () => {
      const result = await addNewPurchaseOrder(values);
      if (result.success) {
        toast({ title: "Purchase Order Created", description: `PO for ${values.vendor} has been successfully created.` });
        router.push("/operations/inventory/purchase-orders");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">New Purchase Order</h1>
        <p className="text-muted-foreground">
          Create an order to send to a vendor for new inventory.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <Card>
                <CardHeader>
                <CardTitle>PO Details</CardTitle>
                <CardDescription>Enter vendor, delivery, and item information.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <FormField control={form.control} name="vendor" render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel>Vendor</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select a vendor" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Component Suppliers Inc.">Component Suppliers Inc.</SelectItem>
                                        <SelectItem value="Raw Materials Co.">Raw Materials Co.</SelectItem>
                                        <SelectItem value="Packaging Solutions">Packaging Solutions</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem className="grid gap-2"><FormLabel>Deliver To (Location)</FormLabel><FormControl><Input placeholder="e.g., Warehouse A" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="deliveryDate" render={({ field }) => (
                            <FormItem className="grid gap-2"><FormLabel>Expected Delivery Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Item</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-[100px]">Quantity</TableHead>
                                <TableHead className="w-[120px]">Unit Cost</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fields.map((field, index) => (
                                <TableRow key={field.id}>
                                    <TableCell>
                                        <FormField control={form.control} name={`lineItems.${index}.item`} render={({ field }) => (<FormItem><FormControl><Input placeholder="Item SKU or name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </TableCell>
                                    <TableCell>
                                        <FormField control={form.control} name={`lineItems.${index}.description`} render={({ field }) => (<FormItem><FormControl><Input placeholder="Item description" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </TableCell>
                                    <TableCell>
                                        <FormField control={form.control} name={`lineItems.${index}.quantity`} render={({ field }) => (<FormItem><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </TableCell>
                                    <TableCell>
                                        <FormField control={form.control} name={`lineItems.${index}.unitCost`} render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </TableCell>
                                    <TableCell><Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-muted-foreground"/></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => append({ item: "", description: "", quantity: 1, unitCost: 0 })}>
                        <PlusCircle className="mr-2 h-4 w-4"/>Add Line Item
                    </Button>
                </CardContent>
                <CardFooter className="border-t pt-6 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 animate-spin" />}
                    Save and Send
                </Button>
                </CardFooter>
            </Card>
        </form>
      </Form>
    </div>
  );
}
