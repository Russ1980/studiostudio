
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

export default function NewJournalEntryPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">New Journal Entry</h1>
        <p className="text-muted-foreground">
          Create a new manual entry for the general ledger.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="entry-no">Entry No.</Label>
              <Input id="entry-no" placeholder="JE-004" />
            </div>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><Input placeholder="Select account" /></TableCell>
                <TableCell><Input placeholder="$0.00" /></TableCell>
                <TableCell><Input placeholder="$0.00" /></TableCell>
                <TableCell><Input placeholder="Description" /></TableCell>
              </TableRow>
               <TableRow>
                <TableCell><Input placeholder="Select account" /></TableCell>
                <TableCell><Input placeholder="$0.00" /></TableCell>
                <TableCell><Input placeholder="$0.00" /></TableCell>
                <TableCell><Input placeholder="Description" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
           <div className="flex justify-end mt-4 pr-24">
             <div className="w-2/5 flex justify-between font-bold">
                <span>Total</span>
                <span>$0.00</span>
                <span>$0.00</span>
             </div>
           </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button>Save and Post</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
