
"use client";

import { useRouter, useSearchParams } from 'next/navigation';
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

const poItems = [
    { sku: "RM-001", name: "Raw Material A", ordered: 50, received: 20 },
    { sku: "COMP-034", name: "Component B", ordered: 100, received: 100 },
    { sku: "TOOL-12", name: "Drill Bit Set", ordered: 10, received: 0 },
];

export default function ReceivePurchaseOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const poNumber = searchParams.get('po');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Receive Items</h1>
        <p className="text-muted-foreground">
          Record the receipt of items for Purchase Order <span className="font-mono font-semibold">{poNumber}</span>.
        </p>
      </div>

      <Card>
        <form onSubmit={(e) => e.preventDefault()}>
            <CardHeader>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="grid gap-2">
                        <Label htmlFor="receive-date">Receive Date</Label>
                        <Input id="receive-date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="packing-slip">Packing Slip / Ref #</Label>
                        <Input id="packing-slip" placeholder="Enter reference number" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Item Name</TableHead>
                            <TableHead className="text-right">Ordered</TableHead>
                            <TableHead className="text-right">Previously Received</TableHead>
                            <TableHead className="text-right w-40">Quantity to Receive</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {poItems.map((item) => (
                            <TableRow key={item.sku}>
                                <TableCell className="font-mono">{item.sku}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-right">{item.ordered}</TableCell>
                                <TableCell className="text-right">{item.received}</TableCell>
                                <TableCell className="text-right">
                                    <Input type="number" defaultValue={item.ordered - item.received} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit">Receive Items</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
