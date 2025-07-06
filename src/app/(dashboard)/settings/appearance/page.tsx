"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Sun, Moon, Laptop } from "lucide-react";

export default function AppearancePage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application to your preference.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 border-2 border-primary">
                    <Sun className="h-8 w-8"/>
                    <span>Light</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                    <Moon className="h-8 w-8"/>
                    <span>Dark</span>
                </Button>
                 <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                    <Laptop className="h-8 w-8"/>
                    <span>System</span>
                </Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
