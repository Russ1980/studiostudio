
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { PlusCircle, Trash2 } from 'lucide-react';
  
export default function NewPurchaseOrderPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">New Purchase Order</h1>
        <p className="text-muted-foreground">
          Create an order to send to a vendor for new inventory.
        </p>
      </div>

      <Card>
        <form onSubmit={(e) => e.preventDefault()}>
            <CardHeader>
            <CardTitle>PO Details</CardTitle>
            <CardDescription>Enter vendor, delivery, and item information.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="grid gap-2">
                        <Label htmlFor="vendor">Vendor</Label>
                        <Select>
                            <SelectTrigger id="vendor">
                                <SelectValue placeholder="Select a vendor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vendor-1">Component Suppliers Inc.</SelectItem>
                                <SelectItem value="vendor-2">Raw Materials Co.</SelectItem>
                                <SelectItem value="vendor-3">Packaging Solutions</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="location">Deliver To (Location)</Label>
                        <Input id="location" placeholder="e.g., Warehouse A" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="delivery-date">Expected Delivery Date</Label>
                        <Input id="delivery-date" type="date" />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Item</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-[100px]">Quantity</TableHead>
                            <TableHead className="w-[120px]">Unit Cost</TableHead>
                            <TableHead className="w-[120px] text-right">Total</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell><Input placeholder="Select or type item SKU" /></TableCell>
                            <TableCell><Input placeholder="Item description" /></TableCell>
                            <TableCell><Input type="number" placeholder="0"/></TableCell>
                            <TableCell><Input type="number" placeholder="0.00"/></TableCell>
                            <TableCell className="text-right font-medium">$0.00</TableCell>
                            <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-muted-foreground"/></Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button variant="outline" size="sm" className="w-fit"><PlusCircle className="mr-2 h-4 w-4"/>Add Line Item</Button>

                <div className="w-1/3 ml-auto mt-4 space-y-2">
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total Amount</span>
                        <span>$0.00</span>
                    </div>
                </div>

            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button variant="secondary" type="submit">Save as Draft</Button>
              <Button type="submit">Save and Send</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
