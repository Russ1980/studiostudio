
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { getInventoryData } from '@/lib/actions';
import { useEffect, useState } from 'react';

type InventoryItem = {
    sku: string;
    name: string;
    category: string;
    location: string;
    cost: number;
    quantity: number;
    reorderPoint: number;
    status: string;
};

export default function AdjustStockPage() {
  const router = useRouter();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    async function fetchData() {
        const data = await getInventoryData();
        setInventory(data.inventory);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Stock Adjustment</h1>
        <p className="text-muted-foreground">
          Manually adjust inventory levels for cycle counts, damages, or other reasons.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto w-full">
        <form onSubmit={(e) => e.preventDefault()}>
            <CardHeader>
                <CardTitle>Adjustment Details</CardTitle>
                <CardDescription>Select an item and specify the adjustment type and quantity.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label>Item to Adjust</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an inventory item" />
                        </SelectTrigger>
                        <SelectContent>
                            {inventory.map((item) => (
                                <SelectItem key={item.sku} value={item.sku}>{item.name} ({item.sku})</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label>Adjustment Type</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a reason for adjustment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cycle-count">Cycle Count</SelectItem>
                            <SelectItem value="damaged">Damaged Goods</SelectItem>
                            <SelectItem value="receipt">Manual Receipt</SelectItem>
                            <SelectItem value="shrinkage">Shrinkage / Loss</SelectItem>
                            <SelectItem value="return">Customer Return</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="adjustment-date">Adjustment Date</Label>
                        <Input id="adjustment-date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantity Change</Label>
                        <Input id="quantity" type="number" placeholder="e.g., -10 or 25" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="notes">Notes / Reference</Label>
                    <Textarea id="notes" placeholder="e.g., Cycle count for Warehouse A, Bin 34" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-6">
              <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit">Save Adjustment</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
