"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
       <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
            Manage your personal profile, security, and notification preferences.
        </p>
      </div>
       <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
            <Card>
                <CardHeader>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>
                    Update your personal information and profile picture.
                </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <Button variant="outline"><Upload className="mr-2" /> Upload New Photo</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" defaultValue="Sarah" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" defaultValue="Johnson" />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="sarah.j@example.com" />
                        </div>
                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="title">Professional Title</Label>
                            <Input id="title" defaultValue="Financial Controller" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save Profile</Button>
                </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="security" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>
                        Manage your password and two-factor authentication settings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                         <h3 className="font-medium">Password Management</h3>
                         <div className="grid gap-2 max-w-md">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <Button variant="outline">Update Password</Button>
                    </div>
                    <div className="space-y-4">
                         <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                         <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                            <Label htmlFor="2fa-app" className="flex flex-col space-y-1">
                                <span>Authenticator App</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Use an app like Google Authenticator or Authy.
                                </span>
                            </Label>
                            <Switch id="2fa-app" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save Security Settings</Button>
                </CardFooter>
             </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                        Choose which notifications you want to receive and where.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Switch id="email-alerts" defaultChecked/>
                            <Label htmlFor="email-alerts">System Alerts</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch id="email-reminders" defaultChecked/>
                            <Label htmlFor="email-reminders">Task Reminders</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch id="email-reports"/>
                            <Label htmlFor="email-reports">Report Delivery</Label>
                        </div>
                    </div>
                     <h3 className="font-medium">In-App Notifications</h3>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Switch id="in-app-alerts" defaultChecked/>
                            <Label htmlFor="in-app-alerts">Desktop Alerts</Label>
                        </div>
                     </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save Notification Preferences</Button>
                </CardFooter>
             </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
