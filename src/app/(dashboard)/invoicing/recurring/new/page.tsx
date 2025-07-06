
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function NewRecurringInvoicePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Create Recurring Invoice</h1>
        <p className="text-muted-foreground">
          Set up an automated billing schedule for a customer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Template</CardTitle>
                    <CardDescription>This is the master invoice that will be generated for each cycle.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
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
                        </TableBody>
                    </Table>
                    <Button variant="outline" size="sm" className="mt-4"><PlusCircle className="mr-2 h-4 w-4"/>Add Line</Button>
                    <div className="w-1/2 ml-auto mt-6 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-medium">$0.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax (0%)</span>
                            <span className="font-medium">$0.00</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Total per Invoice</span>
                            <span>$0.00</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Schedule</CardTitle>
                    <CardDescription>Define when and how often the invoice should be generated.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                     <div className="grid gap-2">
                        <Label>Customer</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a customer"/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="innovate">Innovate Inc.</SelectItem>
                                <SelectItem value="apex">Apex Solutions</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Frequency</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select frequency"/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input id="start-date" type="date" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end-date">End Date</Label>
                            <Input id="end-date" type="date" />
                        </div>
                    </div>
                     <div className="grid gap-2">
                        <Label>Invoice Generation</Label>
                         <RadioGroup defaultValue="auto-send" className="grid grid-cols-2 gap-4">
                             <div>
                                <RadioGroupItem value="auto-send" id="auto-send" className="peer sr-only" />
                                <Label htmlFor="auto-send" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Send Automatically
                                </Label>
                             </div>
                              <div>
                                <RadioGroupItem value="draft" id="draft" className="peer sr-only" />
                                <Label htmlFor="draft" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Create Draft
                                </Label>
                             </div>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      
       <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button variant="secondary">Save as Draft</Button>
          <Button>Start Recurring Profile</Button>
        </div>
    </div>
  );
}
