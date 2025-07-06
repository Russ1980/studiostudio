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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const loginHistory = [
    { device: "Chrome on macOS", location: "San Francisco, CA", time: "2 hours ago", ip: "192.168.1.1" },
    { device: "Safari on iOS", location: "San Francisco, CA", time: "1 day ago", ip: "192.168.1.1" },
];

export default function SecurityPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. It's recommended to use a strong, unique password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2 max-w-md">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2 max-w-md">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button>Update Password</Button>
        </CardFooter>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <Label htmlFor="2fa-app" className="flex flex-col space-y-1">
                    <span>Authenticator App</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                        Use an app like Google Authenticator or Authy.
                    </span>
                </Label>
                <Switch id="2fa-app" />
            </div>
            <Button variant="outline">View Backup Codes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>
            A log of recent sessions to help identify suspicious activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Device</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>IP Address</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loginHistory.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.device}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.time}</TableCell>
                            <TableCell>{item.ip}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
