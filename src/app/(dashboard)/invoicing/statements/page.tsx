"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
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
import { Send, Printer } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CustomerStatementsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Customer Statements</h1>
                <p className="text-muted-foreground">
                    Generate and send a statement of account to a customer.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Statement Options</CardTitle>
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
                                <Label>Statement Type</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select type"/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="balance">Balance Forward</SelectItem>
                                        <SelectItem value="open">Open Item</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Start Date</Label>
                                    <Input type="date"/>
                                </div>
                                <div className="grid gap-2">
                                    <Label>End Date</Label>
                                    <Input type="date"/>
                                </div>
                            </div>
                             <Separator />
                            <div className="flex flex-col gap-2">
                                <Button><Send className="mr-2"/> Generate & Email</Button>
                                <Button variant="outline"><Printer className="mr-2"/> Generate & Print</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                     <Card className="min-h-[600px]">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full">
                           <div className="w-full h-full rounded-lg border border-dashed flex items-center justify-center">
                                <p className="text-muted-foreground">Statement preview will appear here.</p>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
