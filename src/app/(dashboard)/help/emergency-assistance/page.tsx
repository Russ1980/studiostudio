

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, DatabaseBackup, ShieldCheck } from "lucide-react";

export default function EmergencyAssistancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Emergency Assistance</h1>
        <p className="text-muted-foreground">
          Critical support and data recovery options for urgent situations.
        </p>
      </div>
       <div className="p-6 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-destructive mt-1"/>
            <div>
                <h2 className="text-xl font-bold text-destructive">Critical Support Channel</h2>
                <p className="text-destructive/80">
                    If you are experiencing a critical issue such as data loss or a security breach, please use our 24/7 emergency hotline immediately.
                </p>
                 <Button className="mt-4" variant="destructive">Contact Emergency Support</Button>
            </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><DatabaseBackup /> Data Recovery</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">If you need to restore your account from a previous backup, you can do so from the Backup & Restore page. Our support team can also assist with this process.</p>
            </CardContent>
             <CardFooter>
                <Button variant="outline" className="w-full">Go to Backup & Restore</Button>
            </CardFooter>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck /> Security Incident</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">If you suspect your account has been compromised, please change your password immediately and contact emergency support to secure your account.</p>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" className="w-full">Change Password</Button>
            </CardFooter>
        </Card>
      </div>
     
    </div>
  );
}
