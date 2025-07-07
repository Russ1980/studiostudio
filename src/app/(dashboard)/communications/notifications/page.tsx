
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle, Info, Settings, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
    { type: "warning", icon: AlertTriangle, title: "Tax Filing Deadline Approaching", description: "Form 941 is due in 3 days.", time: "1h ago", isNew: true },
    { type: "success", icon: CheckCircle, title: "Payroll Complete", description: "The payroll for June 16-30 has been successfully processed.", time: "5h ago", isNew: true },
    { type: "info", icon: Info, title: "New Client Onboarded", description: "Apex Solutions has completed the onboarding process.", time: "1d ago", isNew: false },
    { type: "success", icon: CheckCircle, title: "Invoice Paid", description: "Invoice #INV-2024-051 for $25,000 has been paid by QuantumLeap Co.", time: "2d ago", isNew: false },
];

export default function NotificationsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications Center</h1>
        <p className="text-muted-foreground">
          Manage all system alerts, user mentions, and important deadlines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2"><Bell/> Notifications Feed</CardTitle>
                    <CardDescription>You have 2 unread notifications.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Mark all as read</Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {notifications.map((notification, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                        <notification.icon className={cn("h-6 w-6 mt-1", {
                            'text-destructive': notification.type === 'warning',
                            'text-success': notification.type === 'success',
                            'text-primary': notification.type === 'info',
                        })} />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-medium">{notification.title}</p>
                                {notification.isNew && <Badge>New</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="ghost">Dismiss</Button>
                        </div>
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Settings/> Notification Settings</CardTitle>
                    <CardDescription>Choose how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <Label htmlFor="email-notifs" className="flex flex-col space-y-1">
                            <span>Email Notifications</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive important updates via email.
                            </span>
                        </Label>
                        <Switch id="email-notifs" defaultChecked/>
                    </div>
                     <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                        <Label htmlFor="push-notifs" className="flex flex-col space-y-1">
                            <span>Push Notifications</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Get real-time alerts on your devices.
                            </span>
                        </Label>
                        <Switch id="push-notifs" />
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button className="w-full">Save Preferences</Button>
                 </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
