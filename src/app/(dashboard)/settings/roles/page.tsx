"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Shield, Users, BarChart, Clock } from "lucide-react";

const roles = [
    { 
        name: "Admin", 
        description: "Full access to all features, settings, and user management.",
        icon: Shield,
    },
    { 
        name: "Accountant", 
        description: "Access to all accounting, invoicing, and reporting features. Cannot manage users or company settings.",
        icon: Users,
    },
     { 
        name: "Reports Only", 
        description: "Can view and export reports, but cannot edit or create any data.",
        icon: BarChart,
    },
     { 
        name: "Time Tracking Only", 
        description: "Can only access time tracking features to log hours against projects.",
        icon: Clock,
    },
];

export default function RolesAndPermissionsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">
            Define roles to control user access across the application.
          </p>
        </div>
        <Button><PlusCircle className="mr-2"/> Create New Role</Button>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Predefined Roles</CardTitle>
            <CardDescription>A list of standard roles. You can edit their permissions or create new custom roles.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {roles.map((role, index) => (
                    <li key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary shrink-0">
                                <role.icon className="h-5 w-5 text-secondary-foreground" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{role.name}</p>
                                <p className="text-sm text-muted-foreground max-w-lg">{role.description}</p>
                            </div>
                        </div>
                        <div className="flex sm:ml-auto gap-2">
                            <Button variant="outline" size="sm">View Permissions</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </CardContent>
       </Card>
    </div>
  );
}
