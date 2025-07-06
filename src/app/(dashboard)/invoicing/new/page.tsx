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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function NewInvoicePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Create Invoice</h1>
        <p className="text-muted-foreground">
          Fill out the details below to create a new professional invoice.
        </p>
      </div>

      <Card>
        <CardHeader className="grid grid-cols-2 gap-6">
            <div>
                <CardTitle>Your Company Inc.</CardTitle>
                <CardDescription>123 Business Rd, Suite 100, Business City, 54321</CardDescription>
            </div>
            <div className="grid grid-cols-2 gap-4 ml-auto text-right">
                 <div className="grid gap-2">
                    <Label htmlFor="invoice-no">Invoice #</Label>
                    <Input id="invoice-no" defaultValue="INV-2024-052" />
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="invoice-date">Invoice Date</Label>
                    <Input id="invoice-date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
                 </div>
            </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label>Bill To</Label>
              <Input placeholder="Select or create a customer" />
              <Textarea placeholder="Customer address will auto-fill here..." className="mt-2 min-h-[100px]" />
            </div>
            <div className="grid grid-cols-2 gap-4 ml-auto">
                 <div className="grid gap-2">
                    <Label htmlFor="terms">Terms</Label>
                    <Input id="terms" defaultValue="Net 30" />
                 </div>
                 <div className="grid gap-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                 </div>
            </div>
          </div>
          
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/5">Item/Service</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><Textarea placeholder="Service or product description" className="min-h-0" /></TableCell>
                <TableCell><Input type="number" defaultValue="1" /></TableCell>
                <TableCell><Input type="number" placeholder="0.00" /></TableCell>
                <TableCell className="text-right font-medium">$0.00</TableCell>
                <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-muted-foreground"/></Button></TableCell>
              </TableRow>
               <TableRow>
                <TableCell><Textarea placeholder="Service or product description" className="min-h-0" /></TableCell>
                <TableCell><Input type="number" defaultValue="1" /></TableCell>
                <TableCell><Input type="number" placeholder="0.00" /></TableCell>
                <TableCell className="text-right font-medium">$0.00</TableCell>
                <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-muted-foreground"/></Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button variant="outline" size="sm" className="mt-4"><PlusCircle className="mr-2 h-4 w-4"/>Add Line</Button>
          
          <div className="w-1/3 ml-auto mt-6 space-y-2">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">$0.00</span>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (0%)</span>
                <span className="font-medium">$0.00</span>
            </div>
             <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>$0.00</span>
            </div>
          </div>

          <div className="mt-8">
            <Label>Notes / Terms</Label>
            <Textarea placeholder="Add any notes or payment terms for the customer..." />
          </div>

        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button variant="secondary">Save as Draft</Button>
          <Button>Save and Send</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
