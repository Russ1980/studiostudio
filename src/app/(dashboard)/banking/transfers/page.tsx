
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Textarea } from "@/components/ui/textarea";

export default function TransfersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Record a Transfer</h1>
        <p className="text-muted-foreground">
          Accurately record the movement of funds between your own accounts.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto w-full">
        <form>
            <CardHeader>
                <CardTitle>Transfer Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label>From</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select source account"/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="checking">Business Checking</SelectItem>
                            <SelectItem value="savings">Savings Account</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label>To</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select destination account"/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="checking">Business Checking</SelectItem>
                            <SelectItem value="savings">Savings Account</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="$0.00" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                    </div>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="memo">Memo (Optional)</Label>
                    <Textarea id="memo" placeholder="e.g., Transfer to cover payroll" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Record Transfer</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
