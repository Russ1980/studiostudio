
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Edit, Copy, History, Trash2 } from "lucide-react";

const automations = [
  { id: 1, name: "Invoice Due Reminder", trigger: "3 days before invoice due", action: "Send 'Due Reminder' email", status: true },
  { id: 2, name: "Welcome New Client", trigger: "After new client is added", action: "Send 'Onboarding Welcome' email", status: true },
  { id: 3, name: "Send Payment Receipt", trigger: "After invoice payment is recorded", action: "Send 'Payment Receipt' email", status: false },
  { id: 4, name: "Request Missing Documents", trigger: "5 days after onboarding starts", action: "Create document request", status: true },
];

export default function AutomationPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflow Automation</h1>
          <p className="text-muted-foreground">
            Create "if-this-then-that" style rules to automate routine tasks.
          </p>
        </div>
        <Button><PlusCircle className="mr-2"/> New Automation Rule</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Rule Name</TableHead>
                <TableHead className="w-1/4">Trigger</TableHead>
                <TableHead className="w-1/4">Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automations.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.trigger}</TableCell>
                  <TableCell>{rule.action}</TableCell>
                  <TableCell>
                    <Switch checked={rule.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit/> Edit Rule</DropdownMenuItem>
                        <DropdownMenuItem><Copy/> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem><History/> View Logs</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2/> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
