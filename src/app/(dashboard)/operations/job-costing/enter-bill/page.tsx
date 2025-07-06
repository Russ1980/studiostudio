
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
  
export default function EnterBillPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Enter Bill for Job</h1>
        <p className="text-muted-foreground">
          Record a vendor bill and assign its costs to a specific job.
        </p>
      </div>

      <Card>
        <form onSubmit={(e) => e.preventDefault()}>
            <CardHeader>
            <CardTitle>Bill Details</CardTitle>
            <CardDescription>Enter the vendor and payment information for this bill.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="grid gap-2">
                        <Label htmlFor="job">Job</Label>
                        <Select>
                            <SelectTrigger id="job">
                                <SelectValue placeholder="Select a job" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="job-1">Retail Store Renovation</SelectItem>
                                <SelectItem value="job-2">Office Building Construction</SelectItem>
                                <SelectItem value="job-3">Custom Machinery Build</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="vendor">Vendor</Label>
                        <Input id="vendor" placeholder="e.g., Component Suppliers Inc." />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="bill-date">Bill Date</Label>
                        <Input id="bill-date" type="date" />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Cost Code</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-[100px]">Amount</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell><Input placeholder="e.g., Materials" /></TableCell>
                            <TableCell><Input placeholder="Lumber and framing supplies" /></TableCell>
                            <TableCell><Input type="number" placeholder="0.00"/></TableCell>
                             <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-muted-foreground"/></Button></TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell><Input placeholder="e.g., Subcontractor" /></TableCell>
                            <TableCell><Input placeholder="Electrical work" /></TableCell>
                            <TableCell><Input type="number" placeholder="0.00"/></TableCell>
                            <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-muted-foreground"/></Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button variant="outline" size="sm" className="w-fit"><PlusCircle className="mr-2 h-4 w-4"/>Add Line Item</Button>

                <div className="w-1/3 ml-auto mt-4 space-y-2">
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total Bill Amount</span>
                        <span>$0.00</span>
                    </div>
                </div>

            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">Save Bill</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
