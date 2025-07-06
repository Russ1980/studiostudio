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
import { Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function TemplatesAndBrandingPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Templates & Branding</h1>
                <p className="text-muted-foreground">
                    Customize the visual appearance of all customer-facing documents.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customization</CardTitle>
                            <CardDescription>Modify the look of your invoices and estimates.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                             <div className="grid gap-2">
                                <Label>Company Logo</Label>
                                <Button variant="outline"><Upload className="mr-2"/> Upload Logo</Button>
                             </div>
                             <div className="grid gap-2">
                                <Label>Layout Template</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select a template"/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="modern">Modern</SelectItem>
                                        <SelectItem value="classic">Classic</SelectItem>
                                        <SelectItem value="minimal">Minimal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="color">Primary Color</Label>
                                <Input id="color" type="color" defaultValue="#2563eb" />
                            </div>
                             <div className="grid gap-2">
                                <Label>Font</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select a font"/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inter">Inter</SelectItem>
                                        <SelectItem value="roboto">Roboto</SelectItem>
                                        <SelectItem value="lato">Lato</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                     <Card className="min-h-[600px]">
                        <CardHeader>
                            <CardTitle>Live Preview</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full">
                           <div className="w-full h-full rounded-lg border border-dashed flex items-center justify-center">
                                <p className="text-muted-foreground">Invoice preview will update in real-time.</p>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
