
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, BarChart, LineChart, PieChart, RefreshCcw, Save } from "lucide-react";

export default function ReportBuilderPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Custom Report Builder</h1>
          <p className="text-muted-foreground">
            Build your own reports by selecting data sources, fields, and visualizations.
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><RefreshCcw /> Clear Report</Button>
            <Button><Save/> Save & Schedule</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Data Source</AccordionTrigger>
                  <AccordionContent>
                     <Select>
                        <SelectTrigger><SelectValue placeholder="Select data source"/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="financials">Financials</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="expenses">Expenses</SelectItem>
                        </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Fields & Columns</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <div className="flex items-center gap-2"><Checkbox id="c1" defaultChecked/><Label htmlFor="c1">Customer Name</Label></div>
                    <div className="flex items-center gap-2"><Checkbox id="c2" defaultChecked/><Label htmlFor="c2">Invoice Date</Label></div>
                    <div className="flex items-center gap-2"><Checkbox id="c3" defaultChecked/><Label htmlFor="c3">Amount</Label></div>
                    <div className="flex items-center gap-2"><Checkbox id="c4"/><Label htmlFor="c4">Status</Label></div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Filters</AccordionTrigger>
                   <AccordionContent>
                    <p className="text-sm text-muted-foreground">Add filters to your data (e.g., "Status is Paid").</p>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                  <AccordionTrigger>Visualization</AccordionTrigger>
                   <AccordionContent>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon"><Table/></Button>
                        <Button variant="secondary" size="icon"><BarChart/></Button>
                        <Button variant="outline" size="icon"><LineChart/></Button>
                        <Button variant="outline" size="icon"><PieChart/></Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[500px] rounded-lg border border-dashed flex items-center justify-center">
                <p className="text-muted-foreground">Report preview will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
