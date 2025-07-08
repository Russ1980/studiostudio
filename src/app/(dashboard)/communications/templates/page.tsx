
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Edit, Copy, History, Trash2 } from "lucide-react";

const templates = [
  { id: 1, name: "New Invoice", type: "Invoice", lastModified: "2024-07-01" },
  { id: 2, name: "Invoice Due Reminder", type: "Reminder", lastModified: "2024-07-05" },
  { id: 3, name: "Onboarding Welcome", type: "Onboarding", lastModified: "2024-06-15" },
  { id: 4, name: "Payment Receipt", type: "Invoice", lastModified: "2024-05-20" },
];

export default function TemplatesPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Communication Templates</h1>
          <p className="text-muted-foreground">
            Create, manage, and edit reusable email and message templates.
          </p>
        </div>
        <Button><PlusCircle className="mr-2"/> New Template</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell><Badge variant="default">{template.type}</Badge></TableCell>
                  <TableCell>{template.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit/> Edit Template</DropdownMenuItem>
                        <DropdownMenuItem><Copy/> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem><History/> View Usage</DropdownMenuItem>
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
